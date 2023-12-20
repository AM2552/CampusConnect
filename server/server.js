const express = require('express');
const app = express();

//route for /
app.get('/',(req,res) =>  {
    res.send("Welcome to CampusConnect");
});

//route for /about
app.get('/about',(req,res) => {
    res.send("This is a forum app created by four disciplined students of FH Campus Wien!")
})

//creates a server
app.listen(5000, ()=> {
    console.log("listening on port 5000");
});