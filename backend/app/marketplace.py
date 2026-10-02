from fastapi import APIRouter
from app.firebase import db

router = APIRouter(prefix="/api/marketplace", tags=["Marketplace"])


@router.get("/products")
def get_products():
    products = []

    docs = db.collection("products").stream()

    for doc in docs:
        product = doc.to_dict()
        product["id"] = doc.id
        products.append(product)

    return products