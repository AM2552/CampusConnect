const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");

app.use(express.json());
app.use(cors());

//goes over every table in models folder, checks if they
//exist in the database and if not, create it
db.sequelize.sync().then(() => {
  //creates a server
  app.listen(5001, () => {
    console.log("listening on port 5001");
  });
});

//routes
const getRouter = require("./routes/threads");

app.use("/", getRouter);
