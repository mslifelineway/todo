const express = require("express");
const {
  createTask,
  getTask,
  updateTask,
  getAllTasks,
  deleteTask,
} = require("../controllers/route.controller");
const {
  validateCreateTaskPayload,
  validateUpdateTaskPayload,
  validateId,
} = require("../middlewares/task.validator");
const { verifyJwt } = require("../middlewares/auth.middleware");

const Router = express.Router();

Router.get("/", getAllTasks);
Router.get("/:id", verifyJwt, validateId, getTask);
Router.post("/", verifyJwt, validateCreateTaskPayload, createTask);
Router.put("/:id", verifyJwt, validateUpdateTaskPayload, updateTask);
Router.delete("/:id", verifyJwt, validateId, deleteTask);

module.exports = Router;
