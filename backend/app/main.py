"""KisanSetu FastAPI backend (prototype)."""

import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.firebase import db
from fastapi.openapi.docs import get_redoc_html
from fastapi.responses import HTMLResponse
from app.marketplace import router as marketplace_router
from app.orders import router as orders_router

load_dotenv()

APP_NAME = os.getenv("APP_NAME", "KisanSetu Backend")
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,http://localhost:5173,http://localhost:8080"
).split(",")

app = FastAPI(title=APP_NAME, version="0.1.0", redoc_url=None)
app.include_router(marketplace_router)
app.include_router(orders_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/redoc", include_in_schema=False)
def redoc() -> HTMLResponse:
    # FastAPI's default ReDoc bundle URL ("redoc@next") is missing on the CDN.
    return get_redoc_html(
        openapi_url="/openapi.json",
        title=f"{APP_NAME} - ReDoc",
        redoc_js_url="https://cdn.jsdelivr.net/npm/redoc@2.5.0/bundles/redoc.standalone.js",
    )


@app.get("/api/health")
def health():
    try:
        db.collection("test").limit(1).stream()

        return {
            "status": "ok",
            "service": APP_NAME,
            "firebase": "connected"
        }

    except Exception as e:
        return {
            "status": "error",
            "firebase": "connection failed",
            "message": str(e)
        }
