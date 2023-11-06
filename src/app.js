'use strict'

const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const initRoute = require('./routes')

const app = express()

/* 
    use middleware
*/
app.use(helmet())
app.use(morgan('dev'))
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* 
    init routes
*/
app.use(initRoute)

/* 
    404
*/
app.use((req, res, next) => {
    const err = new Error(`URL ${ReasonPhrases.NOT_FOUND}`)
    err.status = StatusCodes.NOT_FOUND
    next(err)
})

/* 
    handle error
*/
app.use((err, req, res, next) => {
    const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR
    const message = err.message || ReasonPhrases.INTERNAL_SERVER_ERROR

    res.status(status).json({
        code: status,
        message,
    })
})

module.exports = app
