const mongoose = require('mongoose');
const dbConstant=require('./dbConstant')
const connectDB=async ()=>{
    try{
        await mongoose.connect(dbConstant.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology: true
        })
        console.log("mongodb connected")
    }catch(err){
        console.log("mongo db connection failed with ",err.message)
        process.exit(1);
    }
    
}

module.exports=connectDB

