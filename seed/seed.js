require('dotenv').config()

const mongoose = require('mongoose')

const Exercise = require('../models/exercise')
const baseExercises = require('./base-exercises')

const dbURL = process.env.MONGODB_URL

mongoose.connect(dbURL, () => {
  console.log('Connected to exercise db')
    Exercise.insertMany(baseExercises)
    .then((insertedExercises) => {
      console.log('Exercises inserted')
      console.log(insertedExercises)
      mongoose.connection.close()
    })
})