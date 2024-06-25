const {User} = require('../models/users')
const express = require('express')
const router = express.Router();

router.post('/',async (req,res)=>{
    let user = new User({
        name: req.body.name
    })
    user = await user.save();
    if(!user){
        res.status(500).json({
            success: false
        })
    }res.status(201).send(user);
})
router.get('/',async (req,res)=>{
    const user = await User.find();
    res.json(user)
})
module.exports = router;