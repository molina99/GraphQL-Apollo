const {makeExecutableSchema} = require('graphql-tools')
const {join} = require('path')
const {readFileSync} = require('fs')

const cursoResolver = require('../resolvers/types/curso.resolver')
const estudianteResolver = require('../resolvers/types/estudiante.resolver')
const salaResolver = require('../resolvers/types/sala.resolver')

const typeDefs = readFileSync(join(__dirname, 'schemas.graphql'), 'utf-8')
const schema = makeExecutableSchema({
    typeDefs, resolvers: [
        cursoResolver,
        estudianteResolver,
        salaResolver
    ]
})

module.exports = {
    schema
}
