;
'use strict'
let connectDB = require('../../config/db')
let {ObjectID} = require('mongodb')

module.exports = {
    getEstudiantes: async () => {
        let db, estudiantes
        try {
            db = await connectDB()
            estudiantes = await db.collection('estudiantes').find().toArray()
        } catch (e) {
            console.error(e)
        }
        return estudiantes
    },
    getEstudiante: async (root, {id}) => {
        let db, estudiante
        try {
            db = await connectDB()
            estudiante = await db.collection('estudiantes').findOne({_id: ObjectID(id)})
        } catch (e) {
            console.error(e)
        }
        return estudiante
    }
}

