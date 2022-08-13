// Ticket 4 and 5
const mysql = require("../utils/mysql");
const express = require("express");
const {request, response} = require("express");
const router = express.Router();

async function listHandler(request, response){
    mysql.connection.query("select * from drivers",(err, results, fields) => {
        response.status(200).json(
            {
                data:results,
                message:"success"
            }
        )
    })
}

async function addDriverHandler(request, response){
    let data = request.payload
    let rand_id  = Math.floor(Math.random() * 1000000)
    let stat = "active"
    let values = [rand_id, data.name, data.phone_number, data.created_at, stat]

    mysql.connection.query("insert into drivers (id, name, phone_number, created_at, status) values ?", [values],(err, results, fields) => {
        if (err===null){
            response.status(200).json(
                {
                    message:"success"
                }
            )
        } else {
            response.status(500).json(
                {
                    message:"failed"
                }
            )
        }
    })
}

async function updateDriverHandler(request, response){
    let data = request.payload
    mysql.connection.query(`update drivers set name = ${data.name}, phone_number = ${data.phone_number}, created_at = ${data.created_at}, status = ${data.status}`,
        (err, results, fields) => {
        if (err===null){
            response.status(200).json(
                {
                    message:"success"
                }
            )
        } else{
            response.status(500).json(
                {
                    message:"failed"
                }
            )
        }
    })
}


router.get("/", async (request, response) => {
    await listHandler(request, response);
})

router.post("/", async (req, res) => {
    await addDriverHandler(req, res);
})

router.post("/:updateDriver", async (req, res) => {
    await updateDriverHandler(req, res);
})

module.exports = {
    driverService: router
}
