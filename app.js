const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// Memanggil Router dari masing-masing Endpoint
const categoriesRouter = require('./app/api/v1/categories/router')
const imagesRouter = require('./app/api/v1/images/router')
const talentsRouter = require('./app/api/v1/talents/router')

// Membuat URL default sebelum spesifik URL
const v1 = '/api/v1/cms'

// Import Middlewares
const notFoundMiddleware = require('./app/middlewares/not-found')
const handlerErrorMiddleware = require('./app/middlewares/handler-error')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to API Semina"
    })
});

// Menampilkan API
app.use(v1, categoriesRouter)
app.use(v1, imagesRouter)
app.use(v1, talentsRouter)

// Mengeksekusi Middleware
app.use(notFoundMiddleware)
app.use(handlerErrorMiddleware)

module.exports = app;
