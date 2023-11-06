'use strict'

const { StatusCodes, ReasonPhrases } = require('http-status-codes')

class SuccessResponse {
    constructor({
        message,
        statusCode = StatusCodes.OK,
        reasonPhrase = ReasonPhrases.OK,
        metadata = {},
    }) {
        this.message = message ? message : reasonPhrase
        this.status = statusCode
        this.metadata = metadata
    }
}

module.exports = SuccessResponse
