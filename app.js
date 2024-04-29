const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mysql = require('mysql2/promise');
const { Pool } = require('pg');
const todoRoutes = require('./server/routes/todoRoutes');
const sqlTodoRoutes = require('./server/routes/todoRoutesSQL');
const cors = require('cors');
const {createTableIfNotExists} = require('./server/models/sqlDB')

MONGO_URL= 'mongodb://localhost:27017/Todo_expressjs'

const app = express();
const PORT = 3000;
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.use('/mongodb/todos', todoRoutes);
app.use('/mysql/todos', sqlTodoRoutes);
// Connect to MongoDB
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB', err));

// const connection = await mysql.createConnection('mysql://user:password@host/database');

// Start server
createTableIfNotExists().then(() => {
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }).catch((error) => {
    console.error('Error creating or checking table:', error);
  });