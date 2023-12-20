const express = require('express');
const app = express();
const db = require('./models');

app.use(express.json());

//goes over every table in models folder, checks if they
//exist in the database and if not, create it
db.sequelize.sync().then(() => {
    //creates a server
    app.listen(5000, ()=> {
        console.log("listening on port 5000");
    });
});

//routes
const getRouter = require('./routes/threads');

app.use("/", getRouter);
