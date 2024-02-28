const mongoose = require('mongoose');

const Schema=mongoose.Schema;
// Define User schema
  const UserSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    uuid: {type:String, required:true},
    role: { type: Schema.Types.ObjectId, ref: 'Role', required: true } // Reference to Role model
  });
  

// Define models based on schemas
module.exports=mongoose.model('User', UserSchema);
