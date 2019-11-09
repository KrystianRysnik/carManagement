const express = require('express')
const Car = require('../models/Car')

const router = express.Router()

router.post('/car/add', async (req, res) => {
    // Add new car
    try {
        const car = new Car(req.body)
        await car.save()
        res.status(200).send({ car })
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.get('/car/list', async (req, res) => {
    // List of cars
    Car.find({}, (err, cars) => {
        if (err) {
            res.status(400).send('Something went wrong!')
            next()
        }
        res.status(200).send(cars);
    });
})

module.exports = router