const CustomAPIError = require('./custom-api-error')
const BadRequestError = require('./bad-request')
const NotFoundError = require('./not-found')
const UnauthorizedError = require('./unauthorized')
const Unauthenticated = require('./unauthenticated')

module.exports = {
    CustomAPIError,
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
    Unauthenticated,
}