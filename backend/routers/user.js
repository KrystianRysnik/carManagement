const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')

const router = express.Router()

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

router.put('/user/profile/update', async (req, res) => {
    // Update user
    try {
        await User.updateOne(
            {
                "email": req.body.email
            },
            {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                }
            })
        const user = await User.findOne({ email: req.body.email })
        res.status(200).send(user)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.post('/user/add', async (req, res) => {
    // Create new user
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).send({
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        })
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.put('/user/update', async (req, res) => {
    // Update user
    try {
        await User.updateOne(
            {
                "_id": req.body._id
            },
            {
                $set: {
                    email: req.body.email,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    role: req.body.role
                }
            })
        const user = await User.findOne({ _id: req.body._id })
        console.log(req.body.user)
        res.status(200).send(user)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/user/delete/:id', async (req, res) => {
    // Delete user
    try {
        await User.deleteOne({
            _id: req.params.id
        })
        res.status(200).send('Done')
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

router.get('/user/list', async (req, res) => {
    // List of users
    User.find({}, { '__v': 0, 'password': 0, 'tokens': 0 }, (err, users) => {
        if (err) {
            res.status(400).send('Something went wrong!')
            next()
        }
        res.status(200).send(users);
    });
})

module.exports = router