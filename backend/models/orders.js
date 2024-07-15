const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    orderItems : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderItems',
        required: true
    }],
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'users',
    //     required: true
    // },
    address: {
        type: String,
        required: true
    },city: {
        type: String,
        required: true
    },pincode: {
        type: String,
        required: true
    },phone: {
        type: Number,
        required: true
    },status: {
        type: String,
        default: "Pending"
    },totalPrice: {
        type: Number,
        required: true
    },dateOrdered: {
        type: Date,
        default: Date.now
    }

})

exports.Order = mongoose.model('orders',orderSchema)