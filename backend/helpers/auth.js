const jwt = require('jsonwebtoken');

const authenticateToken= async (req,res,next)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({
            success: false,
            error: "No token found!"
        })
    }
    const secret = process.env.JWT_SECRET;
    jwt.verify(token, secret, (err,user)=>{
        if(err){
            return res.status(403).json({
                success: false,
                error: "Invalid Token!"
            })
        }
        req.user=user;
        next();
    })
}

module.exports.authenticateToken = authenticateToken; 