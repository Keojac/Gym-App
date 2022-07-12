const express = require('express')
const exerciseRouter = express.Router()

const Exercise = require('../models/exercise')
const User = require('../models/user')


exerciseRouter.get('/', (req, res) => {
        res.render('index.ejs', {
        baseUrl: req.baseUrl,
        tabTitle: 'Muscles Index'
    })
})

exerciseRouter.get('/index/:muscletype', (req,res) => {
    console.log(req.params.muscletype);
    Exercise.find({targets: req.params.muscletype})
    .exec()
    .then((exercises) => {
        res.render('display.ejs', {
            allExercises: exercises,
            muscle: req.params.muscletype,
            baseUrl: req.baseUrl,
            tabTitle: req.params.muscletype
        })
    })
})

exerciseRouter.get('/:id', (req, res) => {
    Exercise.findById(req.params.id)
    .exec()
    .then((exercise) => {
        res.render('show.ejs', {
            exercise: exercise,
            baseUrl: req.baseUrl,
            tabTitle: exercise.name,
        })
    })
})







module.exports = exerciseRouter