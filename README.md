# Tennis Player Performance Analysis and Prediction

A web application to analyze tennis player performance and predict match outcomes using machine learning. Intended for sports analytics and (casual/fun) gambling.

## 🔍 Project Goals

- Analyze historical player performance
- Predict future match winners using machine learning
- Display player and match stats through an interactive web app

## 🛠️ Tech Stack

| Layer    | Technology |
|---------|------------|
| Frontend | React + TypeScript + Vite (deployed on Vercel) |
| Backend  | Node.js + Express  |
| ML Models| Python (Pandas, scikit-learn) |
| Database | Supabase (PostgreSQL) |
| Deployment | Vercel (frontend), TBD (backend) |

## 📊 Data Collection
WTA match data (2000–2004) was collected from Jeff Sackmann’s Tennis Data GitHub repository using a Python script. The dataset includes all tour-level singles matches for each season.

Jeff Sackmann is the founder of Tennis Abstract, a comprehensive database of professional tennis statistics. He has also contributed tennis analysis to The Wall Street Journal, ESPN, and Tennis Magazine.

## ⚙️ Getting Started

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

### ML Models
Run locally in a Jupyter Notebook or Python script.