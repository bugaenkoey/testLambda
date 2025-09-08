const mysql = require("mysql2/promise");

exports.handler = async (event) => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST, // зчитуємо з environment variables
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  const [rows] = await connection.execute("SELECT * FROM users LIMIT 5");
  await connection.end();

  return {
    statusCode: 200,
    body: JSON.stringify(rows),
  };
};
