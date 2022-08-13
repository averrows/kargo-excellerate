const mysql = require("../utils/mysql");

async function listHandler(request, response){
    mysql.connection.query("select * from trucks",(err, results, fields) => {
        response.status(200).json(
            {
                data:results,
                message:"success"
            }
        )
    })
}

module.exports = {
    truckService: async (request, response) => {
        if (request.params.length === 0){
            await listHandler(request, response);
        }
    }
}
