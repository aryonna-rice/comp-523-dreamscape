"""Entrypoint of backend API exposing backend to application server"""

from fastapi import FastAPI
from .api import user
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="DreamScape API",
    version="0.0.1"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:19006"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(user.api)