const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image:  {
        type: String,
        default: ''
    },
    price:  {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },rating: {
        type: Number,
        default: 0
    }
})

module.exports.Item = mongoose.model('items', itemSchema);


