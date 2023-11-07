'use strict'

const _ = require('lodash')

module.exports.pickData = (obj = {}, fileds = []) => {
    return _.pick(obj, fileds)
}
