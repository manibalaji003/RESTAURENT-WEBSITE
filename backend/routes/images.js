// !! file not used !!

const express = require('express');
const router = express.Router();
require('dotenv/config');

router.get('/',(req,res)=>{
    const filename=req.body.filename;
    const url = `http://localhost:${process.env.PORT}/images/${filename}.jpg`;
    return res.status(200).json({
        url: url,
        success: true
    })
})

module.exports.imagesRouter = router;