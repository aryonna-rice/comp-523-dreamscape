"""Sample users for development"""

from ...models import User
from datetime import date

user1 = User(id=0, first_name="First", last_name="Patient", device_id=0000, dob=date(1950, 4, 24), gender="Male")

user2 = User(id=1, first_name="Second", last_name="Patient", device_id=1280, dob=date(1963, 7, 1), gender="Female")

user3 = User(id=2, first_name="Third", last_name="Patient", device_id=2789, dob=date(1947, 11, 15), gender=None)

models = [user1, user2, user3]