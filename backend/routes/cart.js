const express = require('express')
const Cart = require('../models/cart');
const {OrderItem} = require('../models/orderItems')
const {Item} = require('../models/items');
const {authenticateToken} = require('../helpers/auth');
const router = express.Router();
const fs = require('fs');
const path = require('path');
require('dotenv/config');
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
    const image_name=req.body.itemName.toLowerCase().replace(/ /g, '-');
    let image_path = `${uri}/${image_name}`;
    const possible_extensions = ['jpg', 'jpeg', 'png'];
    for(ext of possible_extensions){
        let test=path.join(__dirname, '..', 'images', `${image_name}.${ext}`);
        console.log(test);
        console.log();
        if(fs.existsSync(test)){
            image_path=`${image_path}.${ext}`;
            break;
        }
    }
    // let imageLink = new Map();
    // imageLink.set("Lassi", `${uri}/lassi.jpg`);
    // imageLink.set("Mango Lassi", `${uri}/mango-lassi.jpg`);
    // imageLink.set('Soft Drinks', `${uri}/soft-drinks.jpg`);
    // imageLink.set('Mango Milk Shake', `${uri}/mango-milk-shake.jpg`);
    // imageLink.set('Tea', `${uri}/tea.jpg`);
    // imageLink.set('Ice Tea', `${uri}/ice-tea.jpg`);
    // imageLink.set('Special Tea', `${uri}/special-tea.jpg`);
    
    await new OrderItem({
        name: req.body.itemName,
        price: productPrice,
        image: image_path
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