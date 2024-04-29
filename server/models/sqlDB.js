
const pgp = require('pg-promise')();

const connectionOptions = {
  connectionString: 'postgresql://todoexpressjs_user:teleYD18WNQjfWOpPWArFGVdmk065l7N@dpg-comu2621hbls73f9dgs0-a.oregon-postgres.render.com/todoexpressjs',
  ssl: true,
};

const pool = pgp(connectionOptions);

const createTableIfNotExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      completed BOOLEAN DEFAULT FALSE
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Table created or already exists');
  } catch (error) {
    console.error('Error creating or checking table:', error);
  }
};

module.exports = {
  pool,
  createTableIfNotExists,
};