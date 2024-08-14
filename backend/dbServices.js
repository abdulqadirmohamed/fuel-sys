const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "fuel",
    password: "test123",
    database: "fuel",
    port: 3306,
  });

  connection.connect((err) => {
    if (err) {
      console.log(err.message);
    }
    console.log("db " + connection.state);
  });

  try {
    // const [rows, fields] = await connection.execute("SELECT * FROM users");
    const [rows, fields] = await connection.execute("SELECT * FROM users");
    console.log("Result", rows);
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
}
main();

// Example query
// connection.query('SELECT * FROM users', (error, results, fields) => {
//     if (error) throw error;
//     console.log('Results:', results);
// });
