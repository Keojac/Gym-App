const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/user.js')

const usersRouter = express.Router()

usersRouter.get('/signup', (req, res) => {
    res.render('users/signup.ejs', {
        tabTitle: 'Sign Up',
        currentUser: req.session.currentUser
    })
})

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