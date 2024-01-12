const express = require("express");
const { Threads, Posts } = require("../models");
const { verifyToken, modOnly } = require("./auth");

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
  const id = req.params.threadId;
  
  await Posts.destroy({ where: { ThreadId: id } });
  await Threads.destroy({ where: { id: id } });
  
  res.json({ message: "Thread and associated posts deleted successfully" });
};

const archiveThread = async (req, res) => {
  const id = req.params.threadId;
  const thread = await Threads.findByPk(id);
  
  if (!thread) {
    return res.status(404).send(`Thread not found at: /${id}`);
  }

  await Threads.update({ closed: true, archived: true }, { where: { id: id } });

  const updatedThread = await Threads.findByPk(id);
  res.json(updatedThread);
};

const closeThread = async (req, res) => {
  const id = req.params.threadId;
  const thread = await Threads.findByPk(id);
  
  if (!thread) {
    return res.status(404).send(`Thread not found at: /${id}`);
  }

  await Threads.update({ closed: true }, { where: { id: id } });

  const updatedThread = await Threads.findByPk(id);
  res.json(updatedThread);
};

router.get("/", getAllThreads);
router.get("/byId/:id", getThreadById);
router.post("/", verifyToken, createThread);
router.delete("/threads/:threadId", verifyToken, modOnly, deleteThread);
router.put("/threads/:threadId/archive", verifyToken, modOnly, archiveThread);
router.put("/threads/:threadId/close", verifyToken, modOnly, closeThread);

module.exports = router;



module.exports = router;
