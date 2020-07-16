;
'use strict'
const estudianteQuery = require('../queries/estudiante.query')
const estudianteMutations = require('../mutations/estudiante.mutations')

module.exports = {
    Query: estudianteQuery,
    Mutation: estudianteMutations
}
