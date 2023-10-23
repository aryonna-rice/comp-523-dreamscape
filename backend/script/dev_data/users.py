"""Sample users for development"""

from ...models import User

user1 = User(id=0, first_name="First", last_name="Patient", device_id=0000)

user2 = User(id=1, first_name="Second", last_name="Patient", device_id=1280)

user3 = User(id=2, first_name="Third", last_name="Patient", device_id=2789)

models = [user1, user2, user3]