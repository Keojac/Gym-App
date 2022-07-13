require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const app = express()

const userController = require('./controllers/users.js')
const sessionsController = require('./controllers/sessions.js')
const methodOverride = require('method-override')

const exerciseRouter = require('./controllers/exercise')

const PORT = process.env.PORT
const dbURL = process.env.MONGODB_URL

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000
        }
    })
)
app.use(flash())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

app.use('/users', userController)
app.use('/', sessionsController)
app.use('/', exerciseRouter)


mongoose.connect(dbURL, () => {
    console.log('Connected to MongoDB');
})

app.listen(PORT, () => {
    console.log('Server is running on Port:', PORT);
})