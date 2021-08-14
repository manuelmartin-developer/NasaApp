const mongoose = require('../utils/db');
const mongooseSerial = require("mongoose-serial")
const connection = mongoose.createConnection(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });


const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ],
    afNumber: {
        type: String
    },
    afDate: {
        type: Date
    },
    occupation: {
        type: String
    },
    birthdate: {
        type: Date
    },
    deleted: {
        type: Boolean
    },
    astronomicalPoints: {
        type: Number
    },
    neasDiscovered: {
        type: Array
    },
    necsDiscovered: {
        type: Array
    },
    token:{
        type: String
    }
});

let Invoice = connection.model('User', usersSchema, 'Users');
usersSchema.plugin(mongooseSerial, { field:"afNumber", prefix:"AFNUMBER", separator: "-", digits:7});

module.exports = mongoose.model('User', usersSchema, 'Users');