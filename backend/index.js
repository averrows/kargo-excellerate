const express = require('express');
const {truckService} = require("./services/truckService");
const app = express()
const mysql2 = require('mysql2');
const mysql = require("./utils/mysql")

mysql.connection = mysql2.createConnection({
    host: 'localhost',
    port: 3060,
    user: 'root',
    password: 'mysql009A',
    database: 'kargo_excellerate'
});

app.use('/api/trucks', truckService);

app.listen(8000, async () => {
    console.log("server started on http://localhost:8000");
})