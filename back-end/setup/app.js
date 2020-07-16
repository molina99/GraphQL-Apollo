;
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('../config/db')
const passport = require('passport')
const cors = require('cors')
const parseUrl = require('parseurl')
const path = require('path');

const uuid = require('uuid');
const multer = require('multer');
const ejs = require('ejs');

let app = express()
let db = connectDB()
let session = require('express-session')
let sess = {
    secret: process.env.KEY_SESSION,
    resave: false,
    saveUninitialized: true,
    name: 'sessionID',
    cookie: {
        httpOnly: false,
        maxAge: parseInt(process.env.TIME)
    }
}

let corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())
// CORS
app.use(cors(corsOptions))

// SESSION
app.use(session(sess))

// PASSPORT
app.use(passport.initialize())

app.use(passport.session())


// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
//
// // Midleware
// const storage = multer.diskStorage({
//     destination: path.join(__dirname, '../public/uploads'),
//     filename: (req, file, cb) => {
//         cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
//     }
// })

// app.use(multer({
//     storage,
//     dest: path.join(__dirname, 'public/uploads'),
//     limits: {fileSize: 10000000},
//     fileFilter: (req, file, cb) => {
//         const fileTypes = /jpeg|png|jpg|gif/;
//         const minetype = fileTypes.test(file.mimetype);
//         const extname = fileTypes.test(path.extname(file.originalname));
//         if (minetype && extname) {
//             return cb(null, true)
//         }
//         cb("error:Archivo invalido")
//     }
// }).single('image'))


// app.use(require('../routes/image.routes'));

module.exports = app
