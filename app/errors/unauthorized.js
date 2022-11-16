const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('./custom-api-error')

// Digunakan ketika masa aktif token sudah habis, dan mengirimkan error untuk melakukan login kembali
class UnauthorizedError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.StatusCodes = StatusCodes.FORBIDDEN
    }
}

module.exports = UnauthorizedError