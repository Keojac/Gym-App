const bcrypt = require('bcrypt')
const express = require('express')

const User = require('../models/user.js')

const sessionsRouter = express.Router()

// Login Page
sessionsRouter.get('/login', (req, res) => {
    res.render('sessions/login.ejs', {
        tabTitle: 'Log In',
        currentUser: req.session.currentUser
    })
})

// Login page error messages
sessionsRouter.post('/login', (req, res) => {
    User.findOne({ username: req.body.username })
    .then((user) => {
        if(!user) {
            req.flash('error', 'Incorrect username or password')
            return res.redirect('/login')
        }
        if(bcrypt.compareSync(req.body.password, user.password)) {
            req.session.currentUser = user
            res.redirect('/')
        } else {
            req.flash('error', 'Incorrect username or password')
            res.redirect('/login')
        }
    })
})

// End Session Route
sessionsRouter.delete('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = sessionsRouter