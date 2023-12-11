# comp-523-dreamscape
## Back-end
### Set-up
In your terminal
* Make sure you have the latest Python installed
* Install the required modules: `pip3 install -r backend/requirements.txt`
* If you are using a database hosted on GCP or another cloud platform, make sure to include a `.env` file with the appropriate database name, user, password, host, and port.
* Create a local file database: `python3 -m backend.script.create_database`
    * Run this once if you want to test locally
* Reset the database: `python3 -m backend.script.reset_database`
    * To target this script towards a local database file, change line 18 (the engine assignment) to `engine = sqlalchemy.create_engine("sqlite+pysqlite:///database.db", echo=True)`
* Run backend: `uvicorn backend.main:app --reload`

## Front-end
### To run React.js Admin app
In your terminal
* `cd dreamscape-admin`
* `npm install`
* `npm start`

### To run React Native Caregiver app
In your terminal
* `cd dreamscape-caregiver`
* `npm install`
* `npm run ios` or `npm run android`, depending on whether you have Xcode or Android Studio.
