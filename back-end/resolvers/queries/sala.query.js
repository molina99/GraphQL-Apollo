;
'use strict'
let connectDB = require('../../config/db')
let {ObjectID} = require('mongodb')

module.exports = {
    getSalas: async () => {
        let db, sala
        try {
            db = await connectDB()
            sala = await db.collection('salas').find().toArray()
        } catch (e) {
            console.error(e)
        }
        return sala
    },
    getSala: async (root, {id}) => {
        let db, sala
        try {
            db = await connectDB()
            sala = await db.collection('salas').findOne({_id: ObjectID(id)})
        } catch (e) {
            console.error(e)
        }
        return sala
    }
}

