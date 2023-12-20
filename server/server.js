const express = require('express');
const app = express();
const db = require('./models');

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

//app.get('/about',(req,res) => {
    //res.send("This is a forum app created by four disciplined students of FH Campus Wien!")
//})

