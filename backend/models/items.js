const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image:  {
        type: String,
        default: ''
    },
    description: {
        type: String,
        required: true
    },
    price:  {
        type: Number,
        required: true
    }
})

exports.Item = mongoose.model('items', itemSchema);

