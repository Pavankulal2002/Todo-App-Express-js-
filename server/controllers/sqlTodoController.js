const { pool } = require('../models/sqlDB');

// GET all todos
async function getTodos(req, res) {
  try {
    const todos = await pool.any('SELECT * FROM todos order by id;');
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST a new todo
async function postTodo(req, res) {
  try {
    const { name, description } = req.body;
    const query = 'INSERT INTO todos (name, description, completed) VALUES ($1, $2, $3) RETURNING *;';
    const values = [name, description, false]; // Set the default value as false
    const todo = await pool.one(query, values);
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


// PUT/UPDATE a todo
async function putTodo(req, res) {
  try {
    const { id } = req.params;
    const { name, description, completed } = req.body;
    const query = 'UPDATE todos SET name = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *;';
    const values = [name, description, completed, id];
    const todo = await pool.one(query, values);
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE a todo
async function deleteTodo(req, res) {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM todos WHERE id = $1;';
    await pool.query(query, [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PATCH/UPDATE part of a todo
async function patchTodo(req, res) {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const query = 'UPDATE todos SET completed = $1 WHERE id = $2;';
    await pool.query(query, [completed, id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getTodos,
  postTodo,
  putTodo,
  deleteTodo,
  patchTodo
};
