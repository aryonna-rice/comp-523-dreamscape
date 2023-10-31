import sqlalchemy
from sqlalchemy.orm import Session

# Create a database file for now, we can set it up properly later
engine = sqlalchemy.create_engine("sqlite+pysqlite:///database.db")

def db_session():
    """Generator function for SQLAlchemy Sessions."""
    session = Session(engine)
    try:
        yield session
    finally:
        session.close()