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
    Route.find({}, { 'markers._id': 0 }, (err, routes) => {
        if (err) {
            res.status(400).send('Something went wrong!')
            next()
        }
        res.status(200).send(routes)
    });
})

router.post('/route/report', async (req, res) => {
    // List of routes from X (date) to Y (date) for Z (car)
    Route.find({
        startTrace: { $gte: new Date(req.body.dateStart), $lte: new Date(req.body.dateEnd) },
        carVin: req.body.vin
    }, (err, routes) => {
        if (err) {
            res.status(400).send('Something went wrong!')
            next()
        }
        res.status(200).send(routes)
    })
})

module.exports = router