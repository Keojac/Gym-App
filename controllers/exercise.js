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

exerciseRouter.get('/new/:muscletype', (req, res) => {
    res.render('new.ejs', {
        baseUrl: req.baseUrl,
        tabTitle: 'Add New Exercise',
        targets: req.params.muscletype
    })
})

exerciseRouter.post('/index/:muscletype', (req,res) => {
    Exercise.create({
        name: req.body.name,
        targets: req.params.muscletype,
        form: req.body.form,
        images: req.body.images,
        // user_id: req.session.currentUser   **work on this later when creating user profiles**
    })
    .then((newExercise) => {
        console.log('New Exercise Created:', newExercise);
        res.redirect('/index/' + req.params.muscletype)
    })
})

// Edit Route
exerciseRouter.get('/:id/edit', (req, res) => {
    Exercise.findById(req.params.id)
    .exec()
    .then((exercise) => {
    res.render('edit.ejs', { 
        exercise: exercise,
        tabTitle: 'Update Exercise:' + exercise.name,
        baseUrl: req.baseUrl,
        index: req.params.id
        })
    })
})

// Updated Route
exerciseRouter.put('/:id', (req, res) => {
    Exercise.findByIdAndUpdate(req.params.id)
    .exec()
    .then((updatedExercise) => {
        console.log('Exercise Updated:', updatedExercise);
        res.redirect('/' + req.params.id)
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