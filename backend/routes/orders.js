const {Order} = require('../models/orders')
const {OrderItem} = require('../models/orderItems')
const {Cart} = require('../models/cart')
const {User} = require('../models/users');
const {authenticateToken} = require('../helpers/auth')
const express = require('express')
const router = express.Router();

router.get('/', async (req,res)=>{
    const order = await Order.find().populate('orderItems');
    if(!order){
        res.status(500).json({success: false})
    } 
    res.json(order)
})

router.post('/', authenticateToken, async(req,res)=>{
    const userId = req.user.userId;
    let orderItemIds=[];
    let totalPrice;

    // fetching orderItem Id's
    // and total price
    const cart = await Cart.findOne({user: userId})
    if(!cart){
        return res.status(404).json({
            message: "cart not found for the user",
            success: false
        })
    }else{
        orderItemIds = cart.orderItems;
        totalPrice = cart.totalPrice;
    }

    // fetching user details
    const user = await User.findOne({_id: userId});
    if(!user){
        return res.status(500).json({
            message: "Error fetching user",
            success: false
        })
    }

    // creating new order with user details
    await new Order({
        orderItems: orderItemIds,
        user: userId,
        address: `${user.apartment},${user.street}`,
        city: user.city,
        pincode: user.pincode,
        phone: user.phone,
        totalPrice: totalPrice
    })
    .save().then((savedObj)=>{
        return res.status(200).json({
            message: "Order created successfully",
            success: true
        })
    }).catch((err)=>{
        return res.status(500).json(err);
    })
    
    // clearing the cart
    await Cart.deleteOne({user: userId})
    .then(()=>{
        console.log("cart cleared.....");
    }).catch((err)=>{
        console.log(err);
    })
})


module.exports = router;