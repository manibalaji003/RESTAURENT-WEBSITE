const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderItems',
        required: true
    }],
    totalPrice: {
        type: Number,
        required: true
    }
})

module.exports.Cart = mongoose.model('cart',cartSchema);
