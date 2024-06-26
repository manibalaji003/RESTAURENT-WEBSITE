const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },email: {
        type: String,
        required: true
    },passwordHash: {
        type: String,
        required: true
    },apartment: {
        type: String,
        default: ''
    },street: {
        type: String,
        default: ''
    },city: {
        type: String,
        default: ''
    },pincode: {
        type: String,
        default: ''
    },phone: {
        type: Number,
        required: true
    },isAdmin: {
        type: Boolean,
        default: false
    }
})

exports.User = mongoose.model('users', userSchema);
