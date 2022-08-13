const express = require("express")
const {toSQLString} = require("../utils/sqlUtil");
const router = express.Router();
const mysql = require("../utils/mysql")

router.post("/", (req, res) => {
    let request = req;
    let fields = "("
    let values = "("
    let query = "insert into docs ";
    for (let [key, value] of Object.entries(request.body)) {
        fields += `${key},`
        values += `${toSQLString(value)},`
    }
    fields = fields.slice(0, -1)
    values = values.slice(0, -1)
    fields += ")"
    values += ")"
    query += `${fields} values ${values}`
    mysql.connection.query(query, (err, rows) => {
        if (err === null){
            res.status(200).json({
                message:"success"
            })
        } else {
            console.log(err.message)
            res.status(500).json({
                message:"failed"
            })
        }
    })
})


module.exports = {
    docService: router
}