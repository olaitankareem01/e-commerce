const mysql = require('mysql2');

const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'tsquare0601',
    port: 3307,
    database: 'e-commerce',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
module.exports = connection;