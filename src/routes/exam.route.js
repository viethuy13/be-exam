'use strict'

const express = require('express')
const {
    createExam,
    createQuestion,
    getListExam,
    getDetailExam,
    getInfoExam,
} = require('../controllers/exam.controller')

const router = express.Router()

/**
 * route: /exam
 */
router.post('/create', createExam)
router.get('/getListExam', getListExam)
router.get('/getDetailExam', getDetailExam)
router.get('/getInfoExam', getInfoExam)
router.post('/question/create', createQuestion)

module.exports = router
