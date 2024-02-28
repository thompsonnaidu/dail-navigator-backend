const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define BECQuestion schema
const BECQuestionSchema = new Schema({
    therapistId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    answer: [{
      questionId: { type: Number, required: true },
      option: { type: String, required: true },
      score: { type: Number, required: true }
    }],
    totalScore: { type: Number, required: true },
    submittedDate: {type:Date},
    deadline:{type:Date,required:true},
    generatedDate: {type:Date, required:true}
  });

module.exports= mongoose.model("BECQuestion", BECQuestionSchema);