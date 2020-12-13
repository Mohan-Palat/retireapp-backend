// Require necessary NPM packages
const mongoose = require('mongoose');

// Define Participant Schema
const participantSchema = new mongoose.Schema(
  {
    partName: {
        type: String,
        required: true,
      },        
    partSsn: {
        type: String,
        default: '',
      },
    partIsHce: {
        type: Boolean,
        default: false,
      },      
    partIsActive: {
        type: Boolean,
        default: true,
      },      
  },
  { timestamps: true }
);
 
// Compile our Model based on the Schema
const Participant = mongoose.model('Participant', participantSchema);

// Export our Model for use
module.exports = Participant;
