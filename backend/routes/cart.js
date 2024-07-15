const express = require('express')
const {Cart} = require('../models/cart');
const {OrderItem} = require('../models/orderItems')
const {Item} = require('../models/items');
const {authenticateToken} = require('../helpers/auth');
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
    let productPrice;

    // fetching price of the product
    await Item.findOne({name: req.body.itemName})
    .then((obj)=>{
        productPrice=obj.price;
    }).catch((err)=>{
        return res.status(404).json(err);
    })

    // creating New OrderItem
    await new OrderItem({
        name: req.body.itemName,
        price: productPrice
    }).save().then((savedObj)=>{
        orderItemId = savedObj._id;
    }).catch((err)=>{
        console.log("Error: "+err);
        return res.json(err);
    });

    // checking if cart already exists for the user
    // and if not create new cart for the user
    const cart =await Cart.findOne({user: userId});
    if(cart){
        let orderItemIds=cart.orderItems;
        orderItemIds.push(orderItemId);
        let price=cart.totalPrice;
        price+=productPrice;
        await Cart.findByIdAndUpdate(cart._id,{
            orderItems: orderItemIds,
            totalPrice: price
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
            orderItems: [orderItemId],
            totalPrice: productPrice
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