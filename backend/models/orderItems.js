const mongoose = require('mongoose')

const orderItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        default: 1
    },price: {
        type: Number,
        required: true
    },image: {
        type: String,
        required: true
    }
})

exports.OrderItem = mongoose.model('orderItems',orderItemSchema)