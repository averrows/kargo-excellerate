const mysql = require("../utils/mysql");
const express = require("express");
const {request, response} = require("express");
const {toSQLString} = require("../utils/sqlUtil")
const {PAGE_SIZE} = require("../constants/paging");
const router = express.Router();


async function listHandler(request, response) {
    let pageNum = 1;
    if (request.params["page_number"] !== null || request.params["page_number"] === 0){
        pageNum = 1;
    } else {
        pageNum = request.params["page_number"];
    }
    mysql.connection.query("select * from trucks", (err, results, fields) => {
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

async function createHandler(request, response) {
    let insertedData = request.body;
    console.log("insert into trucks" +
        "(license_number,truck_type,plate_type,production_year,`status`)" +
        "values" +
        `(${toSQLString(insertedData["license_number"])},
        ${toSQLString(insertedData["truck_type"])},
        ${toSQLString(insertedData["plate_type"])}
        ,${insertedData["production_year"]}),${insertedData["status"]}`)
    mysql.connection.query("insert into trucks" +
        "(license_number,truck_type,plate_type,production_year,`status`)" +
        "values" +
        `(${toSQLString(insertedData["license_number"])},
        ${toSQLString(insertedData["truck_type"])},
        ${toSQLString(insertedData["plate_type"])}
        ,${insertedData["production_year"]},${toSQLString(insertedData["status"])})`,
        (err, sqlRes) => {
        if (err === null){
            response.status(200).json({
                message:"success"
            })
        } else {
            console.log(err.message)
            response.status(500).json({
                message:"failed"
            })
        }
        })
}

async function detailHandler(request, response) {
    mysql.connection.query(`select * from trucks t where t.license_number = \"${request.params["licenseNumber"]}\"`, (err, result, fields) => {
        mysql.connection.query(`select * from docs where license_number = \"${request.params["licenseNumber"]}\"`, (e, res2) => {
            result[0]["docs"] = res2;
            response.status(200).json(
                {
                    data: result,
                    message: "success"
                }
            )
        })
    })
}


router.get("/", async (request, response) => {
    await listHandler(request, response);
})

router.get("/:licenseNumber", async (req, res) => {
    await detailHandler(req, res);
})

router.post("/", async (req, res) => {
    await createHandler(req, res);
})

router.post("/:licenseNumber", async (req, res) => {

})


module.exports = {
    truckService: router
}
