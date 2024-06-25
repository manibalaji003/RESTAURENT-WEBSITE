const mongoose = require('mongoose')

const orderItemSchema = mongoose.Schema({
    name: String
})

exports.OrderItem = mongoose.model('orderItems',orderItemSchema)