'use strict'

const _ = require('lodash')
const slugify = require('slugify')

module.exports.pickData = (obj = {}, fileds = []) => {
    return _.pick(obj, fileds)
}

module.exports.genSlug = (str) => {
    return slugify(str, {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: true,
        trim: true,
    })
}
