const {toSQLString} = require("../utils/sqlUtil");
const mysql = require("../utils/mysql");
const {response} = require("express");

async function basicUpdateHandler(req, res, tableName, pkParam, pk) {
    let query = `update ${tableName} set `
    for (let [key, value] of Object.entries(req.body)) {
        query += `${key}  = ${toSQLString(value)},`
    }

    query = query.slice(0, -1);
    query += ` where ${pk} = ${toSQLString(req.params[`${pkParam}`])}`
    console.log(query)
    if (Object.keys(req.body).length === 0) {

        res.status(200).json({
            message: "nothing updated"
        })
    } else {
        mysql.connection.query(query, (err) => {
            if (err === null) {
                res.status(200).json({
                    message: "success"
                })
            } else {
                console.log(err.message)
                res.status(500).json({
                    message: "failed"
                })
            }
        })
    }

    return res

}

async function basicGetOneHandler(req, res, tableName, pkParam, pk){
    mysql.connection.query(`select * from ${tableName} t where ${pk} = \"${req.params[pkParam]}\"`, (err, result, fields) => {
        res.status(200).json(
            {
                data: result,
                message: "success"
            }
        )
    })
}

async function basicCreateHandler(req, res, tableName) {
    let request = req;
    let fields = "("
    let values = "("
    let query = `insert into ${tableName}`;
    for (let [key, value] of Object.entries(request.body)) {
        fields += `${key},`
        values += `${toSQLString(value)},`
    }
    fields = fields.slice(0, -1)
    values = values.slice(0, -1)
    fields += ")"
    values += ")"
    query += `${fields} values ${values}`
    if (Object.keys(req.body).length === 0) {
        query = `insert into ${tableName} (name) values (null)`
    }


    mysql.connection.query(query, (err, rows) => {
        if (err === null) {
            res.status(200).json({
                message: "success"
            })
        } else {
            console.log(err.message)
            res.status(500).json({
                message: "failed"
            })
        }
    })
}

module.exports = {
    basicCreateHandler,
    basicUpdateHandler,
    basicGetOneHandler
}