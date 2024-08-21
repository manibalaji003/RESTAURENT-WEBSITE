const {OrderItem} = require('../models/orderItems')
const express = require('express')
const router = express.Router();
require('dotenv/config')
const PORT = process.env.PORT;

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
    const uri=`http://localhost:${PORT}/images`;
    let imageLink = new Map();
    imageLink.set("Lassi", `${uri}/lassi.jpg`);
    imageLink.set("Mango Lassi", `${uri}/mango-lassi.jpg`);
    imageLink.set('Soft Drinks', `${uri}/soft-drinks.jpg`);
    imageLink.set('Mango Milk Shake', `${uri}/mango-milk-shake.jpg`);
    imageLink.set('Tea', `${uri}/tea.jpg`);
    imageLink.set('Ice Tea', `${uri}/ice-tea.jpg`);
    imageLink.set('Special Tea', `${uri}/special-tea.jpg`);
    const orderItem = new OrderItem({
        name: req.body.name,
        qty: req.body.qty,
        image: imageLink.get(req.body.name)
    })
    orderItem.save().then((obj)=>{
        res.status(201).json(Object)
    }).catch((err)=>{
        res.status(500).json({error:err, success: false})
    })
})

module.exports = router;