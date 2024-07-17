const {Order} = require('../models/orders')
const {OrderItem} = require('../models/orderItems')
const {Cart} = require('../models/cart')
const {User} = require('../models/users');
const {authenticateToken} = require('../helpers/auth')
const express = require('express')
const router = express.Router();

router.get('/',authenticateToken, async (req,res)=>{
    const order = await Order.find({user: req.user.userId}).populate('orderItems');
    if(!order){
        res.status(500).json({
            success: false,
            message: "No orders"
        })
    } 
    res.json(order)
})

router.post('/', authenticateToken, async(req,res)=>{
    const userId = req.user.userId;
    let orderItemIds=[];
    let totalPrice=0;

    // fetching orderItem Id's
    const cart = await Cart.findOne({user: userId})
    if(!cart){
        return res.status(404).json({
            message: "cart not found for the user",
            success: false
        })
    }else{
        orderItemIds = cart.orderItems;
    }

    // fetching user details
    const user = await User.findOne({_id: userId});
    if(!user){
        return res.status(500).json({
            message: "Error fetching user",
            success: false
        })
    }

    // updating cart orderitems with new quantity
    qtyObjArr = req.body.qtyObjArr;
    for(let ind=0;ind<orderItemIds.length;ind++){
        let orderItem=await OrderItem.findById(orderItemIds[ind])
        let qty;
        for(qtyObj of qtyObjArr){
            if(qtyObj.name==orderItem.name){
                qty=qtyObj.qty;
            }
        }
        await OrderItem.findByIdAndUpdate(orderItemIds[ind],{
            qty: qty,
            price: orderItem.price*qty
        })
        totalPrice+=orderItem.price*qty
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