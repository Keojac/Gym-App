const express = require('express')
const bcrypt = require('bcrypt')

// User Model
const User = require('../models/user.js')

const usersRouter = express.Router()

// Sign Up Route
usersRouter.get('/signup', (req, res) => {
    res.render('users/signup.ejs', {
        tabTitle: 'Sign Up',
        currentUser: req.session.currentUser
    })
})

// Sign Up creation route
usersRouter.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync()
    )
    User.create(req.body)
    .then((newUser) => {
        console.log('created user is: ', newUser);
        res.redirect('/login')
    })
})

module.exports = usersRouter