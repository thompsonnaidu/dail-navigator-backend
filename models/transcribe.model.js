const mongoose = require('mongoose');
const Schema=mongoose.Schema;
// Define TranscribeSession schema
const TranscribeSessionSchema = new Schema({
  therapistId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to Session model
  clientId:{ type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  session: [{
    doctor:{ type: String},
    patient:{ type: String},
  }]
  });


  
  
module.exports=mongoose.model('TranscribeSession', TranscribeSessionSchema);
