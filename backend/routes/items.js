const {Item} = require('../models/items')
const express = require('express')
const router = express.Router();

router.get('/', async (req,res)=>{
    const productList = await Item.find();

    if(!productList) {
        res.status(500).json({success: false})
    } 
    res.send(productList);
})
router.post('/', (req,res)=>{
    const item = new Item({
        name: req.body.name,
        category: req.body.category,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price
    })
    item.save().then((created)=>{
        res.status(201).json(created)
    }).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

module.exports = router;