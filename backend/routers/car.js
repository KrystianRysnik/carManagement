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

router.put('/car/update', async (req, res) => {
    // Update car
    try {
        await Car.updateOne(
            {
                "_id": req.body._id
            },
            {
                $set: {
                    name: req.body.name,
                    vin: req.body.vin,
                    licensePlate: req.body.licensePlate,
                    engineSize: req.body.engineSize,
                    mileage: req.body.mileage
                }
            })
        res.status(200).send('Done')
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/car/delete/:id', async (req, res) => {
    // Update car
    try {
        await Car.deleteOne({
            _id: req.params.id
        })
        res.status(200).send('Done')
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.get('/car/list', async (req, res) => {
    // List of cars
    Car.find({}, { '__v': 0 }, (err, cars) => {
        if (err) {
            res.status(400).send('Something went wrong!')
            next()
        }
        res.status(200).send(cars);
    });
})

module.exports = router