
# Social Network Api

## Description

This application is an api for a social network. It was built to handle the backend of the social network so that users can share their thoughts, react to a friends' thoughts, and create a friend list.

## Installation

To install the application follow the steps below:
* Clone the repository into your desired directory on your local machine.
* Node.js and MongoDB are required for this application
* Install the npm packages by running the "npm install" command in the directory terminal.

## Technologies

* Javascript
* Express.js
* Mongoose
* MongoDB
* Node.js
* nodemon
* day.js

## Features

The main functions of the application are to allow a user to create an account, add thoughts, add reactions to their friends' thoughts, and add friends to their list.   

To store the data in our database we used `MongoDB`. We used `Express.js` to handle all the routes.  

The models for our data were set up to handle a `User` and a `Thought`. For the `reactions` we did not create a model and only created a schema. This is so we would have a `reaction` field as a subdocument schema in `Thought`. For our `Thought` model and `Reaction` schema we included `createdAt` property to hold a timestamp of when the thoughts and reactions were created. To format the date returned we used `day.js`. Virtuals were added to the `User` and `Thought` models to return the count of `friends` a user has and the count of `reactions` a thought has.  

We have two locations that handle the routes of the api. The main functions are stored in the `controller` folder. These functions are then imported into the `routes` folder. When we invoke the server it will run the files in the routes folder and wait on the requests to be sent. Below is a list of the different routes available with this api: 
* GET all `Users` and all `Thoughts`
* GET a single `User` and single `Thought`
* CREATE a new `User` and a new `Thought`
* UPDATE a `User` and `Thought`
* DELETE a `User` and `Thought`
* ADD a `friend` to `users`
* ADD a `reaction` to `thoughts`
* DELETE a `friend` or `reaction`

## Video Walkthrough

Below is a walkthough video showing the structure of the `User` and `Thought` model along with the functionality of the different requests.

https://drive.google.com/file/d/13D-fb1qTJ79ttzDx9q4J0C_dHvD6GOFs/view

## Credits

Thank you to the following developers that helped me with this project:

* Jonathan Harvey
* Shawn Littrel
* Shazeen Fabius
* Carli Hudson