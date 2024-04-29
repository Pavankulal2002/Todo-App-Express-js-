const express = require('express');
const router = express.Router();
const todoController = require('../controllers/sqlTodoController');

router.get("/", todoController.getTodos);
router.post("/", todoController.postTodo);
router.put("/:id", todoController.putTodo);
router.delete("/:id", todoController.deleteTodo);
router.patch("/:id", todoController.patchTodo);

module.exports = router;
