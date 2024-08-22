const {Item} = require('../models/items')
const express = require('express')
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv/config');
const PORT = process.env.PORT;
const API = process.env.API_URL;


// Configure storage with multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images'); // Save files to the 'images' folder
    },
    filename:   (req, file, cb) => {
        const name = file.originalname.replace(/\s+/g, '-').toLowerCase();
        const ext = path.extname(file.originalname);
        req.savedFile = name;
        req.savedExt = ext;
        cb(null, `${name}`);
    }
});
   
const upload = multer({ storage: storage } );

// get all items
router.get('/get', async (req,res)=>{ 
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
router.get('/get/cat', async (req,res)=>{ 
    const Beverages= await Item.find({category: "Beverages"})
    const Deserts = await Item.find({category: "Desert"})
    
    res.status(200).json({
        Beverages,
        Deserts
    })
})
 

// get specific item by name
router.get('get/:name', async (req,res)=>{

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
// router.get('get/:id', async (req,res)=>{
//     Item.findById(req.params.id).then((obj)=>{
//         res.status(200).json(obj)
//     }).catch((err)=>{
//         res.status(500).json({
//             error: err, 
//             success: false
//         })
//     }) 
// })


// delete by id
router.delete('/delete/:id', (req,res)=>{
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
router.post('/post', upload.single('image') ,(req,res)=>{
    const oldPath = path.join(__dirname,'..', 'images', req.savedFile);
    console.log(oldPath)
    const newName = req.body.name.toLowerCase().replace(/ /g, '-');
    const newPath = path.join(__dirname,'..', 'images', `${newName}${req.savedExt}`);
    console.log(newPath)
    const item = new Item({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        image: `http://localhost:${PORT}/images/${newName}${req.savedExt}`,
        rating: req.body.rating
    })
    fs.rename(oldPath, newPath, (err)=>{
        if(err) console.log(err);
    });
    item.save().then((created)=>{
        res.status(201).json(created)
    }).catch((err)=>{ 
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

// update item by name
router.put('/update/:id',(req,res)=>{
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