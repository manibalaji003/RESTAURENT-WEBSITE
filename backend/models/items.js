const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: String,
    image: String,
    description: String,
    price: Number
})

exports.Item = mongoose.model('items', itemSchema);

