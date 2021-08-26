const mongoose = require('../utils/db')

const landingSchema = new mongoose.Schema({
    "name": String,
    "id": String,
    "nametype": String,
    "recclass": String,
    "mass": Number,
    "fall": String,
    "year": Number,
    "reclat": String,
    "reclong": String,
    "geolocation": {
        "latitude": String,
        "longitude": String
    }
})



module.exports = mongoose.model('Landing', landingSchema, 'Landings');