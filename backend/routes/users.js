const {User} = require('../models/users')
const {authenticateToken} =require('../helpers/auth')
const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateToken=(userId, isAdmin)=>{
    const secret = process.env.JWT_SECRET
    const token = jwt.sign({userId, isAdmin}, secret, {expiresIn: '1d'});
    return token;
}

// router.post('/',async (req,res)=>{
//     let user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         passwordHash : bcrypt.hashSync(req.body.password,10),
//         apartment: req.body.apartment,
//         street : req.body.street,
//         city: req.body.city,
//         pincode: req.body.pincode,
//         phone: req.body.phone,
//         isAdmin: req.body.isAdmin
//     })
//     user = await user.save();
//     if(!user){
//         res.status(500).json({
//             message: "Unable to create user!",
//             success: false
//         })
//     }res.status(201).send(user); 
// })

router.post('/register',async (req,res)=>{
    let user = await User.findOne({email: req.body.email})
    if(user){
        const response_data = {
            user_data: user,
            message:"User already exists!",
            success: false
        }
        return res.status(400).json(response_data)
    }
    user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash : bcrypt.hashSync(req.body.password,10),
        apartment: req.body.apartment,
        street : req.body.street,
        city: req.body.city,
        pincode: req.body.pincode,
        phone: req.body.phone
    })
    user = await user.save();
    if(!user){
        return res.status(500).json({
            message: "Unable to create user!",
            success: false
        })
    }
    const response_data ={
        user_data: user,
        message: "User creation successful",
        success: true
    }
    return res.status(201).json(response_data);
})


router.post('/login',async (req,res)=>{
    const user = await User.findOne({email: req.body.email}) 
    if(!user){
        return res.status(200).json({
            error: "User not found!",
            success: false
        })
    }
    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
        
        // const token = jwt.sign({id : user._id, isAdmin: user.isAdmin},secret,{expiresIn: '1d'})
        const token = generateToken(user._id, user.isAdmin);
        return res.status(200).json({
            success: true,
            token: token,
            user: user
        })
    }
    res.status(200).json({
        error: "Email or Password is wrong!",
        success: false
    })
    
})

router.get('/check',authenticateToken, async (req,res)=>{
    res.status(200).json(req.user);
}) 
router.get('/',async (req,res)=>{
    const user = await User.find().select("-_id -__v -passwordHash")
    res.status(200).json(user)
})
module.exports = router;
