const TodoMongo = require('../models/mongoDB');

// GET all todos
async function getTodos(req, res) {
    try {
        const todos = await TodoMongo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// POST a new todo
async function postTodo(req, res) {
    try {
        const { name, description, completed } = req.body;
        const newTodo = await TodoMongo.create({ name, description, completed });
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// PUT/UPDATE a todo
async function putTodo(req, res) {
    try {
        const { id } = req.params;
        const { name, description, completed } = req.body;
        const updatedTodo = await TodoMongo.findByIdAndUpdate(id, { name, description, completed }, { new: true });
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// DELETE a todo
async function deleteTodo(req, res) {
    try {
        const { id } = req.params;
        await TodoMongo.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// PATCH/UPDATE part of a todo
async function patchTodo(req, res) {
    try {
        const { todo_id } = req.params;
        const { completed } = req.body;
        await TodoMongo.updateOne({ _id: todo_id }, { completed });
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
