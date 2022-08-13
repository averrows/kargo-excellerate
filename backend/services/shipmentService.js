const express = require("express");
const {toSQLString} = require("../utils/sqlUtil");
const mysql = require("../utils/mysql");
const {basicCreateHandler, basicUpdateHandler} = require("./basicService");
const {PAGE_SIZE} = require("../constants/paging");
const router = express.Router();

async function createHandler(req, res){
    await basicCreateHandler(req, res, "shipments")
}

async function updateHandler(req, res){
    await basicUpdateHandler(req, res, "shipments", "shipmentNumber", "shipment_number")
}

async function listHandler(request, response){
    let pageNum = 1;
    if (request.params["page_number"] !== null || request.params["page_number"] === 0){
        pageNum = 1;
    } else {
        pageNum = request.params["page_number"];
    }
    mysql.connection.query("select * from shipments", (err, results, fields) => {
        results.slice((pageNum - 1)*PAGE_SIZE, pageNum*PAGE_SIZE)
        response.status(200).json(
            {
                data: results,
                page_number:pageNum,
                page_size: PAGE_SIZE,
                data_length:results.length,
                message: "success"
            }
        )
    })
}

router.get("/", listHandler);
router.post("/", createHandler);
router.post("/:shipmentNumber", updateHandler)

module.exports = {
    shipmentService: router
}