const mongoose = require('mongoose');

const { Schema } = mongoose;
// Define Role schema
const RoleSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String }
  });

  // Define Role model
module.exports=mongoose.model('Role', RoleSchema);