const mongoose = require('mongoose')

const carSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    vin: {
        type: String,
        required: true,
        unique: true
    },
    licensePlate: {
        type: String,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    }
})

carSchema.statics.findByCredentials = async vin => {
    // Search for a user by email and password.
    const car = await Car.findOne({ vin })
    if (!car) {
        throw new Error({ error: 'Invalid vin' })
    }
    return car
}

const Car = mongoose.model('Car', carSchema)

module.exports = Car