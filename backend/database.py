import sqlalchemy
from sqlalchemy.orm import Session

# Create an in memory database for now, we can set it up properly later
engine = sqlalchemy.create_engine("sqlite+pysqlite:///:memory:")

def db_session():
    """Generator function for SQLAlchemy Sessions."""
    session = Session(engine)
    try:
        yield session
    finally:
        session.close()