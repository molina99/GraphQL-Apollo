;
'use strict'
let connectDB = require('../../config/db')
let {ObjectID} = require('mongodb')

module.exports = {
    getCursos: async () => {
        let db, cursos
        try {
            db = await connectDB()
            cursos = await db.collection('cursos').find().toArray()
        } catch (e) {
            console.error(e)
        }
        return cursos
    },
    getCurso: async (root, {id}) => {
        let db, curso
        try {
            db = await connectDB()
            curso = await db.collection('cursos').findOne({_id: ObjectID(id)})
        } catch (e) {
            console.error(e)
        }
        return curso
    }
}

