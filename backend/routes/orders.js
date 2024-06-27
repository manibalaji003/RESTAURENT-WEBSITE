const {Order} = require('../models/orders')
const express = require('express')
const router = express.Router();

router.get('/',async (req,res)=>{
    const order = await Order.find().populate('orderItems');
    if(!order){
        res.status(500).json({success: false})
    }
    res.json(order)
})
router.post('/', (req,res)=>{
    const order = new Order({
        orderItems: req.body.orderItems
    })
    order.save().then((savedObj)=>{
        res.status(201).json(savedObj)
    }).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    });
})


module.exports = router;