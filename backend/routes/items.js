const {Item} = require('../models/items')
const express = require('express')
const router = express.Router();

// get all items
router.get('/', async (req,res)=>{ 
    Item.find().then((obj)=>{
        res.status(200).json(obj)
    }).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        }) 
    })
})

// get all items - category based array of obj
router.get('/cat', async (req,res)=>{ 
    const Beverages= await Item.find({category: "Beverages"})
    const Deserts = await Item.find({category: "Desert"})
    
    res.status(200).json({
        Beverages,
        Deserts
    })
})


// get specific item by name
router.get('/:name', async (req,res)=>{

    Item.findOne({name: req.params.name}).then((obj)=>{
        res.status(200).json(obj)
    }).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

// get specific item by id
router.get('/:id', async (req,res)=>{
    Item.findById(req.params.id).then((obj)=>{
        res.status(200).json(obj)
    }).catch((err)=>{
        res.status(500).json({
            error: err, 
            success: false
        })
    }) 
})


// delete by id
router.delete('/:id', (req,res)=>{
    console.log(Item)
    Item.findByIdAndDelete(req.params.id).then((obj)=>{
        console.log('deleted successfully!')
        res.status(200).json(obj)
    }).catch((err)=>{
        console.log(err);
        res.status(400).json({
            error: err,
            success: false
        })
    })
})

// post item
router.post('/', (req,res)=>{
    const item = new Item({
        name: req.body.name,
        category: req.body.category,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price,
        rating: req.body.rating
    })
    item.save().then((created)=>{
        res.status(201).json(created)
    }).catch((err)=>{ 
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

// update item by id
router.put('/:id',(req,res)=>{
    Item.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        category: req.body.category,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price,
        rating: req.body.rating
    },{
        new: true
    }).then((obj)=>{
        res.status(201).json(obj)
    }).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

module.exports = router;