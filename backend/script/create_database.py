'''Script for creating a database during development'''

import sqlalchemy

# Use a database file for testing
engine = sqlalchemy.create_engine("sqlite+pysqlite:///database.db", echo=True)