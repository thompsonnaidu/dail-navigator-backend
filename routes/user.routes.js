const express= require("express");
const userRoute= express.Router();
const auth= require("../middlewares/auth.middlewares");
const {User:UserModel,Role:RolesModel}= require("../models");

userRoute.post("/register-user",auth,async (req,res)=>{
    try {
        const {user_id,email}= req.authUserInfo;
        const {firstname,lastname,roleType}=req.body;
        const existingUser=await UserModel.findOne({$and:[{uuid:user_id},{email:email}]}).populate("role");
    
        if(existingUser){
            
            res.status(201).json(existingUser);
            return;
        }
        const role= await RolesModel.findOne({name:roleType});
        let newUser= new UserModel({
            email:email,
            name:firstname+" "+lastname,
            uuid:user_id,
            role:role._id
        });
        newUser=await newUser.save();
        res.status(201).json({...newUser._doc, role:role._doc});
    } catch (error) {
        res.status(500).json({error:error})
    }
})


userRoute.get("/user-info",auth,async(req,res)=>{
    const {user_id,email}= req.authUserInfo;
    const existingUser=await UserModel.findOne({$and:[{uuid:user_id},{email:email}]}).populate("role");
    res.json(existingUser);
});

module.exports=userRoute;