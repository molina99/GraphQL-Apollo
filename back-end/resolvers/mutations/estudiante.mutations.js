;
'use strict'

const jwt = require('jsonwebtoken')
let connectDB = require('../../config/db')
let {ObjectID} = require('mongodb')

module.exports = {
    nuevoEstudiante: async (root, {input}) => {
        let db, estudiante
        try {
            db = await connectDB()
            estudiante = await db.collection('estudiantes').insertOne(input)
        } catch (e) {
            console.error(e)
        }
        console.log(estudiante.ops[0])
        return estudiante.ops[0]
    },
    editarEstudiante: async (root, {id, input}) => {
        let db, estudiante
        try {
            db = await connectDB()
            await db.collection('estudiantes').updateOne(
                {_id: ObjectID(id)},
                {$set: input}
            )
            estudiante = await db.collection('estudiantes').findOne({_id: ObjectID(id)})
        } catch (e) {
            console.error(e)
        }
        return estudiante
    },
    borrarEstudiante: async (root, {id}) => {
        let db
        let deleted = false
        console.log(id)
        try {
            db = await connectDB()
            await db.collection('estudiantes').deleteOne({_id: ObjectID(id)})
            deleted = true
        } catch (e) {
            console.error(e)
        }
        return deleted
    },
    login: async (root, {email, clave}) => {
        let db, estudiante
        try {
            db = await connectDB()
            estudiante = await db.collection('estudiantes').findOne({email})
            if (!estudiante) {
                console.log('La cuenta no existe')
            } else if (clave !== estudiante.clave) {
                console.log('Cuenta de usuario o contaseña incorrecta')
            } else {
                let token = await jwt.sign(estudiante, process.env.KEY_JWT, {
                    algorithm: 'HS256',
                    expiresIn: parseInt(process.env.TIME)
                })
                console.log(token)
                return estudiante
                // return token
            }
        } catch (e) {
            console.error(e)
        }
    },
}
