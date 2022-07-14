const express = require('express')
const exerciseRouter = express.Router()

const upload = require('../middlewares/upload')
const Exercise = require('../models/exercise')
const User = require('../models/user')

// Prevent users from accesing the page by creating authentication
const isAuthenticated = (req, res, next) => {
    if(req.session.currentUser) {
        return next()
    } else {
        res.redirect('/login')
    }
}

// Index Route
exerciseRouter.get('/', (req, res) => {
        console.log(req.session.currentUser);
        res.render('index.ejs', {
        tabTitle: 'Muscles Index',
        currentUser: req.session.currentUser
    })
})

// Secondary Index Route
exerciseRouter.get('/index/:muscletype', (req,res) => {
    Exercise.find({targets: req.params.muscletype})
    .exec()
    .then((exercises) => {
        res.render('display.ejs', {
            allExercises: exercises,
            muscle: req.params.muscletype,
            tabTitle: req.params.muscletype,
            currentUser: req.session.currentUser
        })
    })
})

// New Route
exerciseRouter.get('/new/:muscletype', isAuthenticated, (req, res) => {
    res.render('new.ejs', {
        tabTitle: 'Add New Exercise',
        targets: req.params.muscletype,
        currentUser: req.session.currentUser
    })
})

// Create Route
exerciseRouter.post('/index/:muscletype', upload.single('image'), (req,res) => { 
    if (req.body.images === ''){
    req.body.images = 'https://loremflickr.com/200/200/gym'
    } else {
    req.body.images = req.file
    }
    Exercise.create({
        name: req.body.name,
        targets: req.params.muscletype,
        form: req.body.form,
        images: req.body.images,
        user_id: req.session.currentUser   
    })
    .then((newExercise) => {
        console.log('New Exercise Created:', newExercise);
        res.redirect('/index/' + req.params.muscletype)
    })
})

// Edit Route
exerciseRouter.get('/edit/:id', isAuthenticated, (req, res) => {
    Exercise.findById(req.params.id)
    .exec()
    .then((exercise) => {
    res.render('edit.ejs', { 
        exercise: exercise,
        tabTitle: 'Update Exercise:' + exercise.name,
        targets: req.params.id,
        currentUser: req.session.currentUser
        })
    })
})

// Updated Route
exerciseRouter.put('/:id', (req, res) => {
    Exercise.findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then((updatedExercise) => {
        console.log('Exercise Updated:', updatedExercise);
        res.redirect('/' + req.params.id)
    })
})



// Show Route
exerciseRouter.get('/:id', (req, res) => {
    Exercise.findById(req.params.id)
    .exec()
    .then((exercise) => {
        res.render('show.ejs', {
            exercise: exercise,
            tabTitle: exercise.name,
            currentUser: req.session.currentUser
        })
    })
})

// Delete Route
exerciseRouter.delete('/:id', isAuthenticated, (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => {
        res.redirect('/')
    })
})




module.exports = exerciseRouter