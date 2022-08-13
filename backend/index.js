const express = require('express');
const {truckService} = require("./services/truckService");
const mysql2 = require('mysql2');
const mysql = require("./utils/mysql");

mysql.connection = mysql2.createConnection({
    host: 'localhost',
    port: 3060,
    user: 'root',
    password: 'mysql009A',
    database: 'kargo_excellerate'
});


const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())




app.use('/api/trucks', truckService);

app.get('/test', (req,res) => {
    res.json({
        status:"fine"
    })
})

app.listen(8000, async () => {
    console.log("server started on http://localhost:8000");
})