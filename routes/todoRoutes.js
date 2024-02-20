const express = require("express");
const todoController = require("../controllers/todoController");
const router = express.Router();

router.route("/").get(todoController.getAllTodos).post(todoController.newTodo);

router
  .route("/:id")
  .delete(todoController.deleteTodo)
  .patch(todoController.updateTodo);

module.exports = router;
