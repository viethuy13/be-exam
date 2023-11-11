'use strict'

const express = require('express')
const {
    createExam,
    createQuestion,
    getListExam,
} = require('../controllers/exam.controller')

const router = express.Router()

/**
 * route: /exam
 */
router.post('/create', createExam)
router.get('/getListExam', getListExam)
router.post('/question/create', createQuestion)

module.exports = router
