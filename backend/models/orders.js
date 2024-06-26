const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    orderItems : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: ''
    }]
})

exports.Order = mongoose.model('orders',orderSchema)