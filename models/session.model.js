const mongoose = require('mongoose');
const Schema=mongoose.Schema;
// Define Session schema
const SessionSchema = new Schema({
    clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    therapyId: { type: String, required: true },
    date: { type: Date, required: true },
    endDate: { type: Date, required: true }
  });
  
  
module.exports= mongoose.model('Session', SessionSchema);  