const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define DBT_Dairy schema
const DBTQuestion = new Schema({
    date: { type: Date, required: true },
    answers: {
      emotional: {
        anxiety: { type: Number, required: true },
        sadness: { type: Number, required: true },
        Anger: { type: Number, required: true },
        Shame_guilt: { type: Number, required: true },
        happiness: { type: Number, required: true },
        other: {
          name: { type: String },
          rating: { type: String }
        }
      },
      urges: {
        self_harm: { type: String },
        substance_use: { type: Number, required: true },
        disordered_eating: { type: Number, required: true },
        other: {
          name: { type: String },
          rating: { type: Number }
        }
      },
      Behavior: {
        self_harm: { type: Boolean, required: true },
        substance_use: { type: Boolean, required: true },
        disordered_eating: { type: Boolean, required: true },
        other: {
          name: { type: String },
          rating: { type: Boolean }
        }
      },
      dbtSkill: {
        mindfulness: { type: Boolean, required: true },
        distressed_tolerance: { type: Boolean, required: true },
        emotional_Regulation: { type: Boolean, required: true },
        interpersonal_effectiveness: { type: Boolean, required: true },
        Other: {
          name: { type: String },
          value: { type: Boolean }
        }
      },
      EffectivenessDbtSkill: {
        mindfulness: { type: Number, required: true },
        distressed_tolerance: { type: Number, required: true },
        emotional_Regulation: { type: Number, required: true },
        interpersonal_effectiveness: { type: Number, required: true },
        Other: {
          name: { type: String },
          value: { type: Number }
        }
      }
    }
  });
  
module.exports=mongoose.model("DBTQuestion", DBTQuestion);  