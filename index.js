require("dotenv").config();

const mysql = require("mysql2/promise");
// const mysql = require("mysql");

exports.handler = async (event) => {
  try {
    console.log("DB config:", process.env.DB_HOST, process.env.DB_USER);
    const MYSQL_URI = process.env.MYSQL_URI;
    const connection = await mysql.createConnection(
      MYSQL_URI
      //       {
      //   host: process.env.DB_HOST, // зчитуємо з environment variables
      //   port: process.env.DB_PORT,
      //   user: process.env.DB_USER,
      //   password: process.env.DB_PASS,
      //   database: process.env.DB_NAME,
      //       }
    );

    const [rows] = await connection.execute("SELECT * FROM users LIMIT 5");
    // const [rows] = await connection.execute("SELECT * FROM services LIMIT 5");
    await connection.end();

    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (err) {
    console.error("DB error:", err);
    // connection.end();
    return {
      statusCode: 500,
      body: JSON.stringify(err.message),
    };
  }
};
