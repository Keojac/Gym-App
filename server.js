require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const exerciseRouter = require('./controllers/exercise')

const PORT = process.env.PORT
const dbURL = process.env.MONGODB_URL

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.static('public'))


app.use('/', exerciseRouter)


mongoose.connect(dbURL, () => {
    console.log('Connected to MongoDB');
})

app.listen(PORT, () => {
    console.log('Server is running on Port:', PORT);
})