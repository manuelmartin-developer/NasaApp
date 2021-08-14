const mongoose = require('../utils/db')

const neasSchema = new mongoose.Schema({
    "designation": String,
    "discovery_date": String,
    "h_mag": String,
    "moid_au": String,
    "q_au_1": String,
    "q_au_2": String,
    "period_yr": String,
    "i_deg": String,
    "pha": String,
    "orbit_class": String
})



module.exports = mongoose.model('Nea', neasSchema, 'NEAs');






designation
    :
    "419880 (2011 AH37)"
discovery_date
    :
    "2011-01-07T00:00:00.000"
h_mag
    :
    "19.7"
moid_au
    :
    "0.035"
q_au_1
    :
    "0.84"
q_au_2
    :
    "4.26"
period_yr
    :
    "4.06"
i_deg
    :
    "9.65"
pha
    :
    "Y"
orbit_class
    :
    "Apollo"