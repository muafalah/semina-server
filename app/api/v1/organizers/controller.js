const { createOrganizers, createUsers } = require('../../../services/mongoose/users')
const { StatusCodes } = require('http-status-codes')

const createCMSOrganizers = async (req, res, next) => {
    try {
        const result = await createOrganizers(req)

        res.status(StatusCodes.CREATED).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const createCMSUser = async (req, res, next) => {
    try {
        const result = await createUsers(req)

        res.status(StatusCodes.CREATED).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createCMSOrganizers,
    createCMSUser,
}