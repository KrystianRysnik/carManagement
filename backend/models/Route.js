const mongoose = require('mongoose')

const routeSchema = mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        trim: true
    },
    carVin: {
        type: String,
        required: true,
        trim: true
    },
    startTrace: {
        type: String,
        required: true,
        trim: true
    },
    stopTrace: {
        type: String,
        required: true,
        trim: true
    },
    distance: {
        type: Number,
        required: true
    },
    markers: [{
       coordinate: [{
            longitude: {
                type: Number,
                required: true
            },
            latitude: {
                type: Number,
                required: true
            }
        }],
        key: {
            type: Number,
            required: true
        }
    }]
})

routeSchema.statics.findByCredentials = async id => {
    // Search for a user by email and password.
    const route = await Route.findOne({ id })
    if (!route) {
        throw new Error({ error: 'Invalid route id' })
    }
    return route
}

const Route = mongoose.model('Route', routeSchema)

module.exports = Route