const Categories = require('./model')
const { getAllCategories, createCategories, getOneCategories, updateCategories, deleteCategories } = require('../../../services/mongoose/categories')
const { StatusCodes } = require('http-status-codes')

// Membuat data baru
const create = async (req, res, next) => {
    try {
        const result = await createCategories(req)

        res.status(StatusCodes.CREATED).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

// Menampilkan semua data
const index = async (req, res, next) => {
    try {
        const result = await getAllCategories(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

// Menampilkan data tunggal
const find = async (req, res, next) => {
    try {
        const result = await getOneCategories(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const result = await updateCategories(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const result = await deleteCategories(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    create,
    index,
    find,
    update,
    destroy,
}