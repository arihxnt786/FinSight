from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io
from .database import SessionLocal, engine
from . import models, schemas, auth, classifier
from sqlalchemy.orm import Session

models.Base.metadata.create_all(bind=engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@app.post("/upload")
async def upload_statement(file: UploadFile = File(...), db: Session = Depends(get_db)):
    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents)) # Simplified for CSV
    
    transactions = []
    for _, row in df.iterrows():
        cat = classifier.classifier.predict(row['description'])
        tx = models.Transaction(
            date=row['date'], 
            description=row['description'], 
            amount=row['amount'], 
            category=cat
        )
        db.add(tx)
        transactions.append(tx)
    
    db.commit()
    return {"message": f"Successfully imported {len(transactions)} transactions"}

@app.get("/dashboard/stats")
def get_stats(db: Session = Depends(get_db)):
    # Complex aggregation for the dashboard
    df = pd.read_sql(db.query(models.Transaction).statement, db.bind)
    
    income = df[df['amount'] > 0]['amount'].sum()
    expenses = abs(df[df['amount'] < 0]['amount'].sum())
    savings_rate = ((income - expenses) / income) * 100 if income > 0 else 0
    
    category_breakdown = df[df['amount'] < 0].groupby('category')['amount'].sum().abs().to_dict()
    
    return {
        "total_income": income,
        "total_expenses": expenses,
        "savings_rate": round(savings_rate, 2),
        "category_breakdown": category_breakdown
    }