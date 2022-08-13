const mysql = require("../utils/mysql");
const express = require("express");
const {request, response} = require("express");
const router = express.Router();


async function listHandler(request, response) {
    mysql.connection.query("select * from trucks", (err, results, fields) => {
        response.status(200).json(
            {
                data: results,
                message: "success"
            }
        )
    })
}

async function createHandler(request, response) {
    let insertedData = request.body;
    mysql.connection.query("insert into trucks" +
        "(license_number,truck_type,plate_type,production_year,status)" +
        "values" +
        `(${toSQLString(insertedData["license_number"])},
        ${toSQLString(insertedData["truck_type"])},
        ${toSQLString(insertedData["plate_type"])}
        ,${insertedData["production_year"]}),${toSQLString(insertedData["status"])}`,
        (err, sqlRes) => {
        if (err === null){
            response.status(200).json({
                message:"success"
            })
        } else {
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
