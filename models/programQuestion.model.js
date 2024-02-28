const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProgramQuestionSchema = new Schema({
    analysis: { type: String, required: true },
    queries: [{
      question: { type: String, required: true },
      answer: { type: String, required: true }
    }],
    transcribeId: { type: Schema.Types.ObjectId, ref: 'T', required: true }, // Reference to Session model
    clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    therapistId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    submittedDate: {type:Date},
    deadline:{type:Date,required:true},
    generatedDate: {type:Date, required:true}
  });

module.exports=mongoose.model('ProgramQuestion', ProgramQuestionSchema);
  