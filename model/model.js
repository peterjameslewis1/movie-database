const mongoose = require('mongoose');

const user = new mongoose.Schema({
    firstName: {
        type: String,
        min: 1,
        max: 255
    },
    LastName: {
        type: String,
        min: 1,
        max: 255
    },
    email: {
        type: String,
        min: 10,
        max: 255
    },
    password: {
        type: String,
        min: 5,
        max: 255
    }
})

module.exports = mongoose.model('User', user)