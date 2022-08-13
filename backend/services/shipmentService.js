const express = require("express");
const {toSQLString} = require("../utils/sqlUtil");
const mysql = require("../utils/mysql");
const {basicCreateHandler, basicUpdateHandler, basicGetOneHandler} = require("./basicService");
const {PAGE_SIZE} = require("../constants/paging");
const {driverService} = require("./driverService");
const router = express.Router();

async function createHandler(req, res) {
    await basicCreateHandler(req, res, "shipments")
}

async function updateHandler(req, res) {
    let driverName = req.body["driver_name"];
    let licenseNumber = req.body["license_number"];
    await basicUpdateHandler(req, res, "shipments", "shipmentNumber", "shipment_number")
    await detailHandler(req, res);
    if (req.body["status"] === "completed") {
        req.params = {
            "name": driverName
        }
        req.body = {
            "status": "inactive"
        }
        // update driver status
        await basicUpdateHandler(req, res, "drivers", "name", "name")
        req.params = {
            "license_number": licenseNumber
        }
        req.body = {
            "status": "inactive"
        }
        // update truck status
        await basicUpdateHandler(req, res, "trucks", "license_number", "license_number")
    }
}

async function detailHandler(req, res) {
    await basicGetOneHandler(req, res, "shipments", "shipmentNumber", "shipment_number")
}

async function allocateHandler(req, res) {
    let driverName = req.body["driver_name"];
    let licenseNumber = req.body["license_number"];

    // standard update
    await updateHandler(req, res)

    req.params = {
        "name": driverName
    }
    req.body = {
        "status": "inactive"
    }
    // update driver status
    await basicUpdateHandler(req, res, "drivers", "name", "name")
    req.params = {
        "license_number": licenseNumber
    }
    req.body = {
        "status": "inactive"
    }
    // update truck status
    await basicUpdateHandler(req, res, "trucks", "license_number", "license_number")

}

async function listHandler(request, response) {
    let pageNum = 1;
    if (request.params["page_number"] !== null || request.params["page_number"] === 0) {
        pageNum = 1;
    } else {
        pageNum = request.params["page_number"];
    }
    mysql.connection.query("select * from shipments", (err, results, fields) => {
        results.slice((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE)
        response.status(200).json(
            {
                data: results,
                page_number: pageNum,
                page_size: PAGE_SIZE,
                data_length: results.length,
                message: "success"
            }
        )
    })
}

router.get("/", listHandler);
router.get("/:shipmentNumber", detailHandler);
router.post("/", createHandler);
router.post("/:shipmentNumber", updateHandler);
router.post(":/shipmentNumber/allocate", allocateHandler);

module.exports = {
    shipmentService: router
}