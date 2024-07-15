const express = require('express')
const {Cart} = require('../models/cart');
const {OrderItem} = require('../models/orderItems')
const { authenticateToken } = require('../helpers/auth');
const router = express.Router();

router.get('/',authenticateToken, async (req,res)=>{

    console.log(req.user.userId);
    const cart = await Cart.findOne({user: req.user.userId}).populate('orderItems')
    if(!cart){
        return res.status(404).json({
            message: "Cart not found",
            success: false
        })
    }return res.status(200).json(cart)
})

router.post('/',authenticateToken,async (req,res)=>{
    const userId = req.user.userId;
    let orderItemId;
    await new OrderItem({
        name: req.body.itemName,
        qty: req.body.qty
    }).save().then((savedObj)=>{
        orderItemId = savedObj._id;
    }).catch((err)=>{
        console.log("Error: "+err);
        return res.json(err);
    });
    const cart =await Cart.findOne({user: userId});
    if(cart){
        let orderItemIds=cart.orderItems;
        orderItemIds.push(orderItemId);
        await Cart.findByIdAndUpdate(cart._id,{
            orderItems: orderItemIds
        }).then((savedObj)=>{
            return res.status(200).json({
                success: true,
                message: `Cart updated for the user ${userId}`
            })
        }).catch((err)=>{
            return res.status(500).json({
                success: false,
                err
            })
        })
    }else{
        await new Cart({
            user: userId,
            orderItems: [orderItemId]
        }).save().then((savedObj)=>{
            return res.status(200).json({
                success: true,
                message: `Cart created for user ${userId}`
            })
        }).catch((err)=>{
            return res.status(500).json(err);
        });
    }
})


module.exports = router;