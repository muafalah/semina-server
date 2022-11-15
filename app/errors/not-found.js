// import http-status-codes
const { StatusCodes } = require('http-status-codes')
// import CustomAPIError
const CustomAPIError = require('./custom-api-error')

// Digunakan untuk menambahkan status Not Found 404 kedalam Custom API Error
class NotFound extends CustomAPIError {
    constructor(messsage) {
        super(messsage)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFound