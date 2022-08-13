const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql009A',
    database: 'kargo_excellerate'
});

export default connection;