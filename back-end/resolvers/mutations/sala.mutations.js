;
'use strict'

const jwt = require('jsonwebtoken')
let connectDB = require('../../config/db')
let {ObjectID} = require('mongodb')

module.exports = {
    nuevaSala: async (root, {input}) => {
        let db, sala
        try {
            db = await connectDB()
            sala = await db.collection('salas').insertOne(input)
        } catch (e) {
            console.error(e)
        }
        console.log(sala.ops[0])
        return sala.ops[0]
    },
    editarSala: async (root, {id, input}) => {
        let db, sala
        try {
            db = await connectDB()
            await db.collection('salas').updateOne(
                {_id: ObjectID(id)},
                {$set: input}
            )
            sala = await db.collection('salas').findOne({_id: ObjectID(id)})
        } catch (e) {
            console.error(e)
        }
        return sala
    },
    borrarSala: async (root, {id}) => {
        let db
        let deleted = false
        console.log(id)
        try {
            db = await connectDB()
            await db.collection('salas').deleteOne({_id: ObjectID(id)})
            deleted = true
        } catch (e) {
            console.error(e)
        }
        return deleted
    }
}
