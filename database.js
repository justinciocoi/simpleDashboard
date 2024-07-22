//Justin Ciocoi

require('dotenv').config();

const mysql = require('mysql2/promise');

async function connect() {
  try {
      const connection = await mysql.createConnection({
          //ALWAYS use environment variables to maintain database security
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_CREDENTIAL,
          database: process.env.DB_SCHEMA,
          port: process.env.DB_PORT
      });
      return connection;
  } catch (error) {
      console.error("Error connecting to the database:", error);
      throw error;
  }
}


module.exports = connect;