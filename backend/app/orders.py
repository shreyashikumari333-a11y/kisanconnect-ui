from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from datetime import datetime
from app.firebase import db


router = APIRouter(prefix="/api/orders", tags=["Orders"])


class OrderItem(BaseModel):
    id: str
    name: str
    vendor: str
    price: float
    unit: str
    quantity: int


class OrderCreate(BaseModel):
    items: List[OrderItem]
    total: float


class OrderStatusUpdate(BaseModel):
    status: str


@router.post("/")
def create_order(order: OrderCreate):
    order_data = {
        "items": [item.model_dump() for item in order.items],
        "total": order.total,
        "status": "Order Placed",
        "created_at": datetime.utcnow().isoformat(),
    }

    doc_ref = db.collection("orders").document()
    doc_ref.set(order_data)

    return {
        "message": "Order created successfully",
        "order_id": doc_ref.id,
        "status": "Order Placed",
    }


@router.get("/")
def get_orders():
    orders = []

    docs = db.collection("orders").stream()

    for doc in docs:
        order = doc.to_dict()

        orders.append({
            "id": doc.id,
            "items": order.get("items", []),
            "total": order.get("total", 0),
            "status": order.get("status", "Order Placed"),
            "created_at": order.get("created_at"),
        })

    return orders


@router.patch("/{order_id}/status")
def update_order_status(order_id: str, update: OrderStatusUpdate):
    allowed_statuses = {
        "Order Placed",
        "Processing",
        "Ready",
        "Out for Demo Delivery",
        "Delivered",
    }

    if update.status not in allowed_statuses:
        return {
            "message": "Invalid order status",
            "allowed_statuses": list(allowed_statuses),
        }

    doc_ref = db.collection("orders").document(order_id)
    doc = doc_ref.get()

    if not doc.exists:
        return {
            "message": "Order not found"
        }

    doc_ref.update({
        "status": update.status
    })

    return {
        "message": "Order status updated successfully",
        "order_id": order_id,
        "status": update.status,
    }