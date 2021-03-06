const express = require('express')
const Route = require('../models/Route')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/route/add', auth, async (req, res) => {
    // Add new route
    try {
        const route = new Route(req.body)
        await route.save()
        res.status(200).send(route)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.get('/route/:id/:withMarkers', auth, async (req, res) => {
    // Get route
    let route
    if (`${req.params.withMarkers}` == 'true')
        route = await Route.findById(req.params.id)
    else
        route = await Route.findById(req.params.id, { 'markers': 0 })

    if (route)
        res.status(200).send(route)
    else
        res.status(400).send('Something went wrong!')
})

router.get('/route/list', auth, async (req, res) => {
    // List of routes
    Route.find({}, { '__v': 0, 'markers': 0 }, (err, routes) => {
        if (err) {
            res.status(400).send('Something went wrong!')
            next()
        }
        res.status(200).send(routes.sort((a, b) => b.startTrace - a.startTrace))
    });
})

router.put('/route/update', auth, async (req, res) => {
    // Update route
    try {
        await Route.updateOne(
            {
                "_id": req.body._id
            },
            {
                $set: {
                    carVin: req.body.carVin,
                    startTrace: req.body.startTrace,
                    stopTrace: req.body.stopTrace,
                    distance: req.body.distance,
                    purpose: req.body.purpose,
                    driver: req.body.driver
                }
            })
        res.status(200).send('Done')
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/route/delete/:id', auth, async (req, res) => {
    // Delete route
    try {
        await Route.deleteOne({
            _id: req.params.id
        })
        res.status(200).send('Done')
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.post('/route/report', auth, async (req, res) => {
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