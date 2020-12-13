// Require necessary NPM packages
const mongoose = require('mongoose');

// Define Plan Schema
const planSchema = new mongoose.Schema(
  {
    planName: {
        type: String,
        required: true
    },       
    planIsInstitutional: {
        type: Boolean,
        default: false
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Participant',
      },
    ],
  },
  { timestamps: true }
);

// Compile our Model based on the Schema
const Plan = mongoose.model('Plan', planSchema);

// Export our Model for use
module.exports = Plan;
