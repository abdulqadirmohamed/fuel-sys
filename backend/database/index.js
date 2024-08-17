const mysql = require('mysql2')

const pool = mysql.createPool({
    host: "localhost",
    user: "fuel",
    password: "test123",
    database: "fuel",
    // port: 3306,
    port: 5222,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, conn) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Connected successfully")
    }


})

module.exports = pool.promise()