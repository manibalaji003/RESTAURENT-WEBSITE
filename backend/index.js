const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config');

//schema
const menuSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: String,
    image: String,
    description: String,
    price: Number
})

//models
const Menu = mongoose.model('items', menuSchema);

//middleware
const app = express();
app.use(express.json());
app.use(morgan('tiny'))


const PORT = process.env.PORT;

//routes
app.get('/post', (req,res)=>{
    res.send("nothing!")
})
app.post('/post', (req,res)=>{
    const menu = new Menu({
        name: req.body.name,
        category: req.body.category,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price
    })
    menu.save().then((created)=>{
        res.status(201).json(created)
    }).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

//database
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Database connected....')
}).catch((err)=>{
    console.log(err);
})

//server
app.listen(PORT, ()=>{
    console.log(`App listening in port: ${PORT}`);
})