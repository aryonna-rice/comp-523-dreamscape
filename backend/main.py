"""Entrypoint of backend API exposing backend to application server"""

from fastapi import FastAPI
from .api import user

app = FastAPI(
    title="DreamScape API",
    version="0.0.1"
)

app.include_router(user.api)