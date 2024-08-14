const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'fuel',
    password: 'test123',
    database: 'fuel',
    port: 5222
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db ' + connection.state);
});

// Example query
connection.query('SELECT * FROM user', (error, results, fields) => {
    if (error) throw error;
    console.log('Results:', results);
});

