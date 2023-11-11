'use strict'

const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { db } = require('../db/models')
const SuccessResponse = require('../core/success.response')
const ErrorResponse = require('../core/error.response')
const { Roles } = require('../helpers/RoleUser')
const { genSlug } = require('../utils')

const createExam = async (req, res, next) => {
    try {
        const { email, access_token, name, subject, time, number_question } =
            req.body
        const user = await db.User.findOne({
            where: { email },
            raw: true,
            include: { model: db.Token, as: 'token' },
            nest: true,
        })

        const decode = jwt.verify(access_token, user.token.at_secret)

        if (user.role !== Roles.ADMIN) {
            throw new ErrorResponse({
                message: ReasonPhrases.FORBIDDEN,
                status: StatusCodes.FORBIDDEN,
            })
        }

        const exam = await db.Exam.create({
            user_id: user.id,
            name,
            slug: genSlug(name),
            subject,
            number_question: +number_question,
            time: +time,
        })

        const result = new SuccessResponse({
            message: 'Create exam ok',
            statusCode: StatusCodes.CREATED,
            metadata: { exam },
        })
        return res.status(result.status).json(result)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const getListExam = async (req, res, next) => {
    try {
        const listExam = await db.Exam.findAll()
        const result = new SuccessResponse({
            metadata: { listExam },
        })
        return res.status(result.status).json(result)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const createQuestion = async (req, res, next) => {
    try {
        const { email, access_token, questions, exam_id } = req.body
        const user = await db.User.findOne({
            where: { email },
            raw: true,
            include: { model: db.Token, as: 'token' },
            nest: true,
        })

        const decode = jwt.verify(access_token, user.token.at_secret)

        if (user.role !== Roles.ADMIN) {
            throw new ErrorResponse({
                message: ReasonPhrases.FORBIDDEN,
                status: StatusCodes.FORBIDDEN,
            })
        }

        questions.forEach(async (itemQuestion, index) => {
            // tao cau hoi
            const question = await db.Question.create({
                exam_id,
                content: itemQuestion.content,
            })

            // tao cau tra loi
            itemQuestion.answers.forEach(async (itemAnswer, index) => {
                const answer = await db.Answer.create({
                    question_id: question.id,
                    content: itemAnswer.content,
                    is_true: itemAnswer.is_true,
                })
            })
        })

        const result = new SuccessResponse({
            message: ReasonPhrases.CREATED,
            statusCode: StatusCodes.CREATED,
        })
        return res.status(result.status).json(result)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = { createExam, createQuestion, getListExam }
