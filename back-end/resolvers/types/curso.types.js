;
'use strict'

let connectDB = require('../../config/db')
let {ObjectID} = require('mongodb')

module.exports = {
    Curso: {
        asistentes: async ({asistentes}) => {
            let db, asistentesData, ids
            try {
                db = await connectDB()
                ids = asistentes ? asistentes.map(id => ObjectID(id)) : []
                asistentesData = ids.length > 0
                    ? await db.collection('estudiantes').find(
                        {_id: {$in: ids}}
                    ).toArray()
                    : []
            } catch (e) {
                console.error(e)
            }
            return asistentesData
        }
    }
}
