const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define DBT_Dairy schema
const DBTQuestion = new Schema({
  submittedDate: { type: Date },
  deadline: { type: Date, required: true },
  generatedDate: { type: Date, required: true },
  therapistId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    
  answers: {
    emotional: {
      anxiety: { type: Number,  },
      sadness: { type: Number, },
      anger: { type: Number, },
      shame_guilt: { type: Number, },
      happiness: { type: Number, },
      other: {
        name: { type: String },
        rating: { type: String }
      }
    },
    urges: {
      self_harm: { type: String },
      substance_use: { type: Number, },
      disordered_eating: { type: Number,},
      other: {
        name: { type: String },
        rating: { type: Number }
      }
    },
    behavior: {
      self_harm: { type: Boolean, },
      substance_use: { type: Boolean, },
      disordered_eating: { type: Boolean,  },
      other: {
        name: { type: String },
        rating: { type: Boolean }
      }
    },
    dbtSkill: {
      mindfulness: { type: Boolean},
      distressed_tolerance: { type: Boolean },
      emotional_regulation: { type: Boolean, },
      interpersonal_effectiveness: { type: Boolean, },
      other: {
        name: { type: String },
        value: { type: Boolean }
      }
    },
    effectivenessDbtSkill: {
      mindfulness: { type: Number,  },
      distressed_tolerance: { type: Number,  },
      emotional_regulation: { type: Number, },
      interpersonal_effectiveness: { type: Number,  },
      other: {
        name: { type: String },
        value: { type: Number }
      }
    }
  }
});

module.exports = mongoose.model("DBTQuestion", DBTQuestion);  