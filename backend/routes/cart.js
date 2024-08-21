const express = require('express')
const {Cart} = require('../models/cart');
const {OrderItem} = require('../models/orderItems')
const {Item} = require('../models/items');
const {authenticateToken} = require('../helpers/auth');
const router = express.Router();
require('dotenv/config')
const PORT= process.env.PORT;

router.get('/',authenticateToken, async (req,res)=>{
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

    // check if item already in cart
    const cart =await Cart.findOne({user: userId}).populate('orderItems');
    if(cart){
        for(orderItemId of cart.orderItems){
            if(orderItemId.name == req.body.itemName){
                return res.status(200).json({
                    message: "item already exists",
                    success: false
                })
            }
        }
    }

    // fetching price of the product
    await Item.findOne({name: req.body.itemName})
    .then((obj)=>{
        productPrice=obj.price;
    }).catch((err)=>{
        return res.status(404).json(err);
    })

    // creating New OrderItem'
    const uri=`http://localhost:${PORT}/images`;
    let imageLink = new Map();
    imageLink.set("Lassi", `${uri}/lassi.jpg`);
    imageLink.set("Mango Lassi", `${uri}/mango-lassi.jpg`);
    imageLink.set('Soft')
    await new OrderItem({
        name: req.body.itemName,
        price: productPrice,
        image: imageLink.get(req.body.itemName)
    }).save().then((savedObj)=>{
        orderItemId = savedObj._id;
    }).catch((err)=>{
        console.log("Error: "+err);
        return res.json(err);
    });

    // checking if cart already exists for the user
    // and if not create new cart for the user
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

router.post('/remove',authenticateToken, async(req,res)=>{
    const userId = req.user.userId;
    let itemId; // id of item to be deleted

    // fetching item id to be deleted
    await Cart.findOne({user: userId}).populate('orderItems')
    .then((obj)=>{
        for(orderItem of obj.orderItems){
            if(orderItem.name == req.body.itemName){
                console.log("caught");
                itemId = orderItem._id;
                break;
            }
        }
    }).catch((err)=>{
        return res.status(200).json(err);
    })
    console.log(itemId);

    // removing item from cart
    await Cart.updateOne({user: userId},{
        $pull: {orderItems: itemId}
    }).then((obj)=>{
        return res.status(200).json(obj);
    })

    // deleting orderItem
    await OrderItem.findByIdAndDelete(itemId);

})
module.exports = router;