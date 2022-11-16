const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require("./custom-api-error");

// Digunakan jika masa token sudah habis
class UnauthenticatedError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthenticatedError