# Matcha

Matcha is a dating site that allows people to meet up with others based on their romantic and
sexual preferences, interests and location. In that sense, it’s very similar to Tinder.

# Requirements:

1)  All depenedencies required by the package.json, both for the backend and front-end.
2)  A Redis Instance
3)  A MySQL Instance, could use Amazon RDS.

# Application setup steps:

1)  From the root folder, run npm install, this would install all the required dependencies
    as well as generate a package.lock file which is the tree representation of all your
    dependencies.

2)  Install Redis, on Mac, you could do "brew install redis".

3)  Start the Redis server by running "redis-server" on the command line.

4)  Import the schema matcha.mwb into MySQL Workbench after it's connected to your MySQL instance.

5)  Under the "Database" tab in MySQL Workbench, click on "Forward Engineer".

6)  Continue with the steps and make sure to review the SQL scripts that were generated off of
    the schema.

    NOTE: You might need to alter the generated constraint names as they might conflict.

7)  Complete the forward engineering process.

8)  Remember to add your MySQL instance credentials to the SQLCon.js file located inside the
    config folder.

9)  Start up the NodeJS server by running "npm run start" from the root folder.

10) The front-end for matcha is located in a seperate repo:

    https://github.com/diVid3/matcha-frontend-dev

    Download this to wherever you'd like, and install the dependencies by running
    "npm install", after which you can run the project by entering "npm run start"
    from the root folder (indicated by the package.json file)

11) Once the backend and the front-end is up and running, you should be able to register.

12) After registration, verify your account and enjoy!

# Architecture:

Backend:

This is a typical MVC application.

The main application flow can be summarized as this:

  UI  --> Controllers --> Models --> Data access.

Responsibilities:

  1)  Controllers

      Their job is to control / orchestrate the program flow between the UI and the Models or
      data access layer.

  2)  Models are the classes constructed when database state gets reconstituted, however, in
      my case, I used them similar to repositories as the design is simple enough to allow it.

  3)  Config, simple a place to store configuration files.

  4)  pictures, a folder where the uploaded pictures will be stored.

  5)  helpers, a folder to contain commonly used helper classes.

  6)  documentation, a folder containing the different error codes used throughout the
      application.

  7)  middleware, a folder containing the commonly used middleware throught the application.

  8)  routes contain the routes for the router, e.g. "/home".

# Testing

https://github.com/wethinkcode-students/corrections_42_curriculum/blob/master/matcha.markingsheet.pdf

Test Outline:

1)  Launch the web servers.

2)  Create an account.

3)  Login.

4)  Edit profile.

5)  View profile suggestions.

6)  Search / Filter.

7)  Geolocation.

8)  Popularity Rating.

9)  Notifications.

10) View a profile.

11) Like / Unlinke User.

12) Block

13) Messaging.

Expected Outcomes:

1)  Both the backend server and the front-end server should start.

2)  You should be able to create an account.

3)  You should be able to log in.

4)  You should be able to edit your profile.

5)  You should be able to view suggested profiles.

6)  You should be able to search and filter profiles.

7)  Geolocation should be a feature.

8)  People should have popularity ratings.

9)  You should be able to receive notifications

10) You should be able to view a profile.

11) You should be able to like and unlike a user.

12) You should be able to block a user.

13) You should be able to chat with a user your liked and if they liked you back.
