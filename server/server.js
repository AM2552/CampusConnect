const express = require('express');
const app = express();

app.get('/',(req,res) =>  {
    res.send("Welcome to CampusConnect");
});

app.listen(5000, ()=> {
    console.log("listening on port 5000");
});