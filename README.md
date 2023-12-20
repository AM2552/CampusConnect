# CampusConnect

Setup for client application:

- cd ./client
- npm install react
- npm start

Setup for backend application:

- cd ./server
- npm install --save-dev nodemon -> if "npm run dev" doesn't work

Further server setup:
- npm install corse, mysql2, sequelize, sequelize-cli
- Then important, npx sequelize init and delete folders seeders and migrations

For sequelize:
- don't touch the index.js file, this just identifies the files in ./models as different tables
- to connect database with mysql workbench go to config.json, change the properties to the ones you set on mysql

For database:
- download mysql server, workbench and shell on your pc 
    guide here -> https://www.youtube.com/watch?v=k5tICunelSU&t=303s&ab_channel=AmitThinks
- sequelize will connect everything to the workbench 
