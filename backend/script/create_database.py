'''Script for creating a database during development'''

import sqlalchemy
from .. import entities

# Use a database file for local testing, change the string in database.py to this to redirect to local
engine = sqlalchemy.create_engine("sqlite+pysqlite:///database.db", echo=True)

entities.EntityBase.metadata.create_all(engine)