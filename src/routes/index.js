'use strict'
const express = require('express')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const authroute = require('./auth.route')
const examRoute = require('./exam.route')
const { getAccessToken } = require('../controllers/token.controller')

const router = express.Router()

router.use('/auth', authroute)
router.use('/exam', examRoute)
router.use('/token/getAccessToken', getAccessToken)

module.exports = router
