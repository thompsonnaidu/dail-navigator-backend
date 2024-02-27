const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define BECQuestion schema
const BECQuestionSchema = new Schema({
    sessionId: { type: Schema.Types.ObjectId, ref: 'Session', required: true }, // Reference to Session model
    id: { type: String, required: true },
    answer: [{
      questionId: { type: Number, required: true },
      option: { type: String, required: true },
      score: { type: Number, required: true }
    }],
    totalScore: { type: Number, required: true }
  });

module.exports= mongoose.model("BECQuestion", BECQuestionSchema);