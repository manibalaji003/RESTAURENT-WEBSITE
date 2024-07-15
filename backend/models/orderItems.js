const mongoose = require('mongoose')

const orderItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    }
})

exports.OrderItem = mongoose.model('orderItems',orderItemSchema)