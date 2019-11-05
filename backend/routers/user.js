const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/hello', async (req, res) => {
    try {
        res.send('Hello world!')
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.post('/user/register', async (req, res) => {
    // Create new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.post('/user/login', async (req, res) => {
    // Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({ error: 'Logind failed! Check authentication credentials' })
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.get('/user/profile', auth, async (req, res) => {
    // View logged in user profile
    res.send(req.user)
})

router.post('/user/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    }
    catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router