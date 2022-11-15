const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (req, res, next, err) => {
    // Status Error Default jika errornya tidak diketahui, seperti service mati atau aplikasinya crash
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong try again later",
    }

    // Untuk menghandle ValidationError bawaan dari mongoose, seperti minLength, maxLength, required, dll
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors).map((item) => item.message).join(', ')
        // Ini error kodenya bisa menggunakan 400 atau 422
        customError.statusCode = 400
    }

    // Untuk menghandle ketika ada error di dalmam kodingan kita seperti duplicate atau field tidak ada
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
        customError.statusCode = 400
    }

    // Untuk menghandle saat _id tidak ada atau tidak ditemukan
    if (err.name === 'CastError') {
        customError.msg = `No item found with id : ${err.value}`
        customError.statusCode = 404
    }

    return res.status(customError.statusCode).json({ msg: customError.msg })
}