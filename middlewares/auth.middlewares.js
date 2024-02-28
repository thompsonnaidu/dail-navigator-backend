
const admin= require("firebase-admin");
const { User } = require("../models");

module.exports = async (req,res,next) =>{
    const {authtoken}= req.headers;
    try {    
    const data=  await admin.auth().verifyIdToken(authtoken);
    data["userDataStore"]=await User.findOne({uuid:data.user_id}).populate('role');
     req.authUserInfo=data;
     next();
    } catch (error) {
       res.status(403).json({error:"invalid token"}) 
    }
}
