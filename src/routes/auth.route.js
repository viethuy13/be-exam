'use strict'
const asyncController = require('../helpers/asyncController')

const express = require('express')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const { login } = require('../controllers/auth.controllers')

const router = express.Router()
router.get('/login', asyncController(login))

module.exports = router
