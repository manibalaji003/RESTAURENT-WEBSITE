const {Order} = require('../models/orders')
const {OrderItem} = require('../models/orderItems')
const {authenticateToken} = require('../helpers/auth')
const express = require('express')
const router = express.Router();

router.get('/',async (req,res)=>{
    const order = await Order.find().populate('orderItems');
    if(!order){
        res.status(500).json({success: false})
    } 
    res.json(order)
})
router.post('/', async(req,res)=>{
    let orderItemIds=[];
    for(let ind=0;ind<req.body.orderItems.length;ind++){
        let orderItem =  new OrderItem({
            name: req.body.orderItems[ind].name,
            qty: req.body.orderItems[ind].qty
        })
        orderItem = await orderItem.save()
        if(!orderItem){
            return res.status(500).json({
                error: "Cannot make order!",
                success: false
            })
        }
        orderItemIds.push(orderItem._id)
        
    }
    const order = new Order({
        orderItems: orderItemIds,
        address: req.body.address,
        city: req.body.city,
        pincode: req.body.pincode,
        phone: req.body.phone,
        totalPrice: req.body.totalPrice,
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