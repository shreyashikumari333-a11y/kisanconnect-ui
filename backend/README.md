# KisanSetu Backend (FastAPI)

Separate Python backend for the KisanSetu prototype. The React frontend in the
repository root is untouched by this folder.

## Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

## Run

```bash
uvicorn app.main:app --reload --port 8000
```

- API base URL: http://localhost:8000
- Health check: http://localhost:8000/api/health
- Swagger docs: http://localhost:8000/docs
- ReDoc docs: http://localhost:8000/redoc

## Files

- `app/main.py` — FastAPI app, CORS setup, `GET /api/health`.
- `requirements.txt` — Python dependencies.
- `.env.example` — template for environment variables (`.env` is git-ignored).
