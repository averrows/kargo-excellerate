// Ticket 4 and 5
const mysql = require("../utils/mysql");
const express = require("express");
const {request, response} = require("express");
const {basicCreateHandler, basicUpdateHandler, basicGetOneHandler} = require("./basicService");
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
    await basicCreateHandler(request, response, "drivers");
}

async function updateDriverHandler(request, response){
    await basicUpdateHandler(request,response,"drivers","name", "name")
}

async function detailHandler(request, response){
    await basicGetOneHandler(request, response, "drivers", "name", "name");
}


router.get("/", async (request, response) => {
    await listHandler(request, response);
})

router.post("/", async (req, res) => {
    await addDriverHandler(req, res);
})

router.post("/:name", async (req, res) => {
    await updateDriverHandler(req, res);
})

router.get("/:name", detailHandler)

module.exports = {
    driverService: router
}
