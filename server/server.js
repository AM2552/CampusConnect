const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
const getRouter = require("./routes/threads");
const postsRouter = require("./routes/posts");
const users = require("./routes/users");

app.use(express.json());
app.use(cors());
app.use("/", getRouter);
app.use("/posts", postsRouter);
app.use("/users", users)

//goes over every table in models folder, checks if they
//exist in the database and if not, create it
db.sequelize.sync().then(() => {
  //creates a server
  app.listen(5001, () => {
    console.log("listening on port 5001");
  });
});
