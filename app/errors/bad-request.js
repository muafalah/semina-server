// import http-status-codes
const { StatusCodes } = require('http-status-codes')
// import Custom API Error
const CustomAPIError = require('./custom-api-error')

// Digunakan untuk menambahkan status Bad Request 400 kedalam Custom API Error
class BadRequest extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequest