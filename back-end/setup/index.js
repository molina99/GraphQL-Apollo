;
'use strict'

const env = require('dotenv').config()
const {graphqlHTTP} = require('express-graphql')
const {schema} = require('../schemas/configSchema')
const port = process.env.PORT || 4000

let app = require('./app')

app.use('/gql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})
