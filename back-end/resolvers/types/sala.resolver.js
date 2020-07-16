;
'use strict'
const salaQuery = require('../queries/sala.query')
const salaMutations = require('../mutations/sala.mutations')

module.exports = {
    Query: salaQuery,
    Mutation: salaMutations
}
