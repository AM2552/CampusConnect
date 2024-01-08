const express = require("express");
const router = express.Router();
const { Threads } = require("../models");
const { Posts } = require("../models"); // assuming your Posts model is defined
const verifyToken = require("./auth");

router.get("/", async (req, res) => {
  //sequelize function which goes through all tables and stores it in variable
  const listOfThreads = await Threads.findAll();
  res.json(listOfThreads);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const thread = await Threads.findByPk(id);
  res.json(thread);
});

router.post("/", verifyToken, async (req, res) => {
  //important that we receive data from an input or form as json (object)
  const thread = req.body;
  //sequelize function which creates entry in database
  await Threads.create(thread);
  res.json(thread);
});


module.exports = router;
