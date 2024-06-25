const {OrderItem} = require('../models/orderItems')
const express = require('express')
const router = express.Router();

router.get('/',(req,res)=>{
    OrderItem.find()
    .then((obj)=>{
        res.status(200).json(obj)
    })
    .catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })

})
router.post('/',(req,res)=>{
    const orderItem = new OrderItem({
        name: req.body.name
    })
    orderItem.save().then((obj)=>{
        res.status(201).json(Object)
    }).catch((err)=>{
        res.status(500).json({error:err, success: false})
    })
})

module.exports = router;