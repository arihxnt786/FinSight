# FinSight — Personal Finance Analytics

> A full-stack financial analytics dashboard that turns transaction data into understandable spending, budgeting, and financial-health insights.

## Overview

FinSight combines a React frontend with a Python API backend and machine-learning-based transaction categorization. The application is designed around a simple goal: make personal financial data easier to explore and act on.

## Key Features

- **Transaction categorization** using TF-IDF + Multinomial Naive Bayes
- **Financial health KPIs** including savings rate and spending trends
- **Interactive analytics** with donut and bar charts
- **Budget tracking** with monthly limits and actual spending
- **CSV/Excel transaction parsing** with Pandas
- **PDF report generation** for financial summaries

## Architecture

```text
React + Tailwind CSS
        |
        v
FastAPI REST API
        |
   +----+-----+
   v          v
SQLite     ML Pipeline
              |
       TF-IDF + Naive Bayes
```

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Tailwind CSS, Recharts, Lucide Icons |
| Backend | FastAPI, Python, SQLAlchemy |
| Database | SQLite |
| Machine Learning | scikit-learn, TF-IDF, Multinomial Naive Bayes |
| Data Processing | Pandas |

## Getting Started

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## ML Evaluation

The repository currently documents the following model evaluation figures on its training dataset:

- Accuracy: **94.2%**
- Precision: **91%**
- Recall: **89%**

These metrics are dataset-specific and should not be interpreted as production performance without independent validation.

## Project Structure

```text
FinSight/
├── backend/          # FastAPI application, database and ML logic
├── frontend/         # React dashboard
└── README.md
```

## Portfolio Focus

This project demonstrates full-stack application development, REST API integration, data processing, applied machine learning, database design, and data visualization in one workflow.

## Author

**Arihant** — BCA student at JIIT Noida

[GitHub](https://github.com/arihxnt786)
