;
'use strict'

let connectDB = require('../../config/db')
let {ObjectID} = require('mongodb')

module.exports = {
    nuevoCurso: async (root, {input}) => {
        const defaults = {
            description: 'Descripcion default',
            genero: 'Genero default'
        }
        const nuevoCurso = Object.assign(defaults, input)
        let db, curso
        try {
            db = await connectDB()
            curso = await db.collection('cursos').insertOne(nuevoCurso)
            nuevoCurso._id = curso.insertedId
        } catch (e) {
            console.error(e)
        }
        return nuevoCurso
    },
    editarCurso: async (root, {id, input}) => {
        let db, curso
        try {
            let asistentes = []
            if (input.asistentes.length > 0) {
                input.asistentes.forEach(asistente => {
                    asistentes.push(ObjectID(asistente))
                })
                console.log(asistentes)
                input.asistentes = asistentes
            }
            db = await connectDB()
            await db.collection('cursos').updateOne(
                {_id: ObjectID(id)},
                {$set: input}
            )
            curso = await db.collection('cursos').findOne({_id: ObjectID(id)})
        } catch (e) {
            console.error(e)
        }
        return curso
    },
    borrarCurso: async (root, {id}) => {
        let db
        let deleted = false
        console.log(id)
        try {
            db = await connectDB()
            await db.collection('cursos').deleteOne({_id: ObjectID(id)})
            deleted = true
        } catch (e) {
            console.error(e)
        }
        return deleted
    },
}
