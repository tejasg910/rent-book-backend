
const express = require('express')
const mongoose  = require('mongoose');
const User  = require('../model/User');
const jwt = require('jsonwebtoken');

const router = express.Router();


router.post("/admin",express.json(), async(req, res)=>{
    try {
        const {token }  = req.body;
        const data =  jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(data);

        const user =await User.findOne({email: data.email});
        if(!user){

            return    res.status(400).json({success: false, message: "No account found"});
            
        }
      

        if(user.role==="admin"){
            return  res.status(200).json({success: true, message: "Account found"});
        }else{
            return  res.status(400).json({success: false, message: "You are not admin"});

        }



       

        
        
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"})
    }
      

})


module.exports = router;