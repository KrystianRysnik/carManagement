const express = require('express')
const Route = require('../models/Route')

const router = express.Router()

router.post('/route/add', async (req, res) => {
    // Add new route
    try {
        const route = new Route(req.body)
        await route.save()
        res.status(200).send({ route })
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.get('/route/list', async (req, res) => {
    // List of routes
    Route.find({}, { 'markers.coordinate._id' : 0, 'markers._id' : 0 }, (err, routes) => {
        if (err) {
            res.status(400).send('Something went wrong!')
            next()
        }
        res.status(200).send(routes);
    });
})

module.exports = router