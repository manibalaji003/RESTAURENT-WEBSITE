const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    orderItems : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderItems',
        required: true
    }]
})

exports.Order = mongoose.model('orders',orderSchema)