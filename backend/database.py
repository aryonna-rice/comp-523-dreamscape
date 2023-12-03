import os
import dotenv
import sqlalchemy
from sqlalchemy.orm import Session

# Load environment variables from .env file
dotenv.load_dotenv(verbose=True)

def engine_str(database=os.getenv("DATABASE_NAME")):
    """Helper function to create the engine string with environment variables"""
    user = os.getenv("DATABASE_USER")
    password = os.getenv("DATABASE_PASSWORD")
    host = os.getenv("DATABASE_HOST")
    port = os.getenv("DATABASE_PORT")
    return f"postgresql+psycopg2://{user}:{password}@{host}:{port}/{database}"


engine = sqlalchemy.create_engine(engine_str(), echo=True)
"""SQLAlchemy database engine for app"""


def db_session():
    """Generator function for SQLAlchemy Sessions."""
    session = Session(engine)
    try:
        yield session
    finally:
        session.close()