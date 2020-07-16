;
'use strict'
const cursoQuery = require('../queries/curso.query')
const cursoMutations = require('../mutations/curso.mutations')
const cursoTypes = require('../types/curso.types')

module.exports = {
    Query: cursoQuery,
    Mutation: cursoMutations,
    ...cursoTypes
}
