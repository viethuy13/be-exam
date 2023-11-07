'use strict'
const express = require('express')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const authroute = require('./auth.route')

const router = express.Router()

router.use('/auth', authroute)

module.exports = router
