const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  surveyId: {
    type: String,
    required: true
  },
  responses: [
    {
      questionId: {
        type: String,
        required: true
      },
      answer: {
        type: mongoose.Mixed, // This allows for various types of responses (string for text, array for multiple choice, etc.)
        required: true
      }
    }
  ]
}, {
  timestamps: true
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
