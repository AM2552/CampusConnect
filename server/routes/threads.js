const express = require("express");
const { Threads, Posts } = require("../models");
const { verifyToken, authorAndMod, authorOnly, modOnly } = require("./auth");

const router = express.Router();

const getAllThreads = async (req, res) => {
  const listOfThreads = await Threads.findAll();
  res.json(listOfThreads);
};

const getThreadById = async (req, res) => {
  const id = req.params.id;
  const thread = await Threads.findByPk(id);
  res.json(thread);
};

const createThread = async (req, res) => {
  const thread = req.body;
  await Threads.create(thread);
  res.json(thread);
};

const deleteThread = async (req, res) => {
  const id = req.params.id;
  
  await Posts.destroy({ where: { ThreadId: id } });
  await Threads.destroy({ where: { id: id } });
  
  res.json({ message: "Thread and associated posts deleted successfully" });
};

const archiveThread = async (req, res) => {
  const id = req.params.id;
  res.json({ message: "Thread and associated posts deleted successfully" });
};

const closeThread = async (req, res) => {
  const id = req.params.id;
  res.json({ message: "Thread and associated posts deleted successfully" });
};

router.get("/", getAllThreads);
router.get("/byId/:id", getThreadById);
router.post("/", verifyToken, createThread);
router.delete("/:id", verifyToken, modOnly, deleteThread);
router.put("/:id", verifyToken, modOnly, archiveThread);
router.put("/:id", verifyToken, modOnly, closeThread);

module.exports = router;



module.exports = router;
