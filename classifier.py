import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline

# Training data: Description -> Category
TRAINING_DATA = [
    ("Starbucks Coffee", "Food"), ("McDonalds Burger", "Food"), ("Uber Eats", "Food"),
    ("Uber Trip", "Transport"), ("Shell Gas Station", "Transport"), ("Lyft Ride", "Transport"),
    ("Amazon Prime", "Shopping"), ("Walmart Store", "Shopping"), ("Apple Store", "Shopping"),
    ("Electric Bill", "Utilities"), ("Water Company", "Utilities"), ("Verizon Wireless", "Utilities"),
    ("Netflix Subscription", "Entertainment"), ("Steam Games", "Entertainment"), ("Cinema", "Entertainment"),
    ("Salary Deposit", "Income"), ("Freelance Payment", "Income"), ("Dividend Pay", "Income"),
]

class TransactionClassifier:
    def __init__(self):
        self.model = None
        self.vectorizer = None
        self.categories = ["Food", "Transport", "Shopping", "Utilities", "Entertainment", "Income", "Others"]

    def train(self):
        df = pd.DataFrame(TRAINING_DATA, columns=['text', 'category'])
        pipeline = Pipeline([
            ('tfidf', TfidfVectorizer()),
            ('clf', MultinomialNB())
        ])
        self.model = pipeline.fit(df['text'], df['category'])
        joblib.dump(self.model, 'model/transaction_model.pkl')

    def predict(self, text: str):
        if self.model is None:
            self.train()
        # Fallback logic: If confidence is low, return "Others"
        return self.model.predict([text])[0]

classifier = TransactionClassifier()