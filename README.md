<!-- @format -->

# CampusConnect

To get the application correctly set up you need to follow some steps:

- choose an IDE or code editor of your liking (we recommend VS Code) and
   - clone the repository: https://github.com/AM2552/CampusConnect.git

In this repository you will find 2 main structures:

    client & server


The client structure will act as the application's frontend and the server structure as the backend.

We recommend opening two terminal instances for easier setup of the components.

**Setup for client application**:

- cd ./client
- npm install react
- npm start
- npm install axios, allows you to make api requests, similar to fetch api from js

**Setup for backend application**:

- cd ./server
- npm install --save-dev nodemon -> if "npm run dev" doesn't work

Further server setup:

- npm install cors, mysql2, sequelize, sequelize-cli
- Then important, npx sequelize init and delete folders seeders and migrations

For sequelize:

- don't touch the index.js file, this just identifies the files in ./models as different tables
- to connect database with mysql workbench go to config.json, change the properties to the ones you set on mysql

For database:

- download mysql server, workbench and shell on your pc
  guide here -> https://www.youtube.com/watch?v=k5tICunelSU&t=303s&ab_channel=AmitThinks
- sequelize will connect everything to the workbench

Libraries:

- Formik: Provides easier creation of a input form
- Yup: Provides text validation for the input of the form, for example max length of username or type of characters

Extension:

- ES7 + React
