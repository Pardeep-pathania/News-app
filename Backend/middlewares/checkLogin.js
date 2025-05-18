const Users = require("../models/userModel");

const jwt = require('jsonwebtoken')

async function checkLogin(req,res,next){
    try {
        let header = req.headers.authorization;
        if(!header){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        let token = header.split(" ")[1];
        if(!token){
            return res.status(401).json({
                message:"Unauthorised"
            })
        }
        let {userId} = jwt.verify(token,"thisisyourprivatekey");

        let user = await Users.findById(userId).select("-password -__v");
        console.log(user)

        if(!user){
             return res.status(401).json({
                message:"Please login"
            })
        }

        req.user = user

        next()

    } catch (error) {
        res.status(500).json({
            message:"Unauthorised user"
        })
    }
}

module.exports = checkLogin