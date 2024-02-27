const mongoose = require('mongoose');
const Schema=mongoose.Schema;
// Define TranscribeSession schema
const TranscribeSessionSchema = new Schema({
    sessionId: { type: Schema.Types.ObjectId, ref: 'Session', required: true }, // Reference to Session model
    data: { type: String, required: true }
  });


  
  
module.exports=mongoose.model('TranscribeSession', TranscribeSessionSchema);
