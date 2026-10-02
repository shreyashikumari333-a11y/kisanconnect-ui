import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate(
    "kisansetu-6d0bc-firebase-adminsdk-fbsvc-d44e1d55f2.json"
)

if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

db = firestore.client()