const {User} = require('../models/users')
const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')

router.post('/',async (req,res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash : bcrypt.hashSync(req.body.password,10),
        apartment: req.body.apartment,
        street : req.body.street,
        city: req.body.city,
        pincode: req.body.pincode,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin
    })
    user = await user.save();
    if(!user){
        res.status(500).json({
            success: false
        })
    }res.status(201).send(user);
})
router.post('/login',async (req,res)=>{
    const user = await User.findOne({email: req.body.email}) 
    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
        return res.status(200).json(user)
    }
    res.status(500).json({
        error: "Email or Password is wrong!",
        success: false
    })
    
})
router.get('/',async (req,res)=>{
    const user = await User.find()
    res.status(200).json(user)
})
module.exports = router;