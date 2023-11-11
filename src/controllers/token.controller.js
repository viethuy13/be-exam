'use strict'

const jwt = require('jsonwebtoken')
const { ReasonPhrases, StatusCodes } = require('http-status-codes')
const { db } = require('../db/models')
const ErrorResponse = require('../core/error.response')
const SuccessResponse = require('../core/success.response')

const getAccessToken = async (req, res, next) => {
    try {
        const { refresh_token } = req.body
        const token = await db.Token.findOne({ where: { refresh_token } })

        if (!token) {
            // nếu token không tìm thấy
            throw new ErrorResponse({
                message: ReasonPhrases.FORBIDDEN,
                status: StatusCodes.FORBIDDEN,
            })
        }

        const decode = jwt.verify(refresh_token, token.rt_secret)
        const user = await db.User.findOne({ where: { email: decode.user } })

        if (!user) {
            // check nếu người dùng không có trong db
            // trả về thông báo lỗi
            throw new ErrorResponse({
                message: 'User does not exist',
                status: StatusCodes.NOT_FOUND,
            })
        }

        const access_token = jwt.sign({ user: user.email }, token.at_secret, {
            expiresIn: '10m', // thời gian hết hạn của token: 10 phút
        })

        const result = new SuccessResponse({
            metadata: { tokens: { access_token } },
        })
        res.status(result.status).json(result)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = {
    getAccessToken,
}
