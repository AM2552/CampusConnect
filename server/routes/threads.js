const express = require("express");
const router = express.Router();
const { Threads } = require("../models");

router.get("/", async (req, res) => {
  //sequelize function which goes through all tables and stores it in variable
  const listOfThreads = await Threads.findAll();
  res.json(listOfThreads);
});

router.post("/", async (req, res) => {
  //important that we receive data from an input or form as json (object)
  const thread = req.body;
  //sequelize function which creates entry in database
  await Threads.create(thread);
  res.json(thread);
});

module.exports = router;
