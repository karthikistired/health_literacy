const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
      unique: true
    },
    questionText: {
      type: String,
      required: true
    },
    questionType: {
      type: String,
      required: true,
      enum: ['MCQ', 'MSQ', 'INFO' ]// Add other types as needed
    },
    options: [
      {
        optionText: {
          type: String,
          required: true
        },
        optionWeight: {
          type: Number,
          default: 0
        }
      }
    ],
    open: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    chosenAnswer: {
      type: String,
      default: ""
    },
    weightage: {
      type: Number,
      default: 1
    },
    weightSet: {
      type: Number,
      default: 0
    },
    image: {
      type: [String],
      default: []
    },
    table: {
      type: [String], // Assuming table is an array of strings
      default: []
    },
    latex: {
      type: [String], // Assuming latex is an array of strings
      default: []
    },
    regex: {
      type: String,
      default: ""
    }
  });

const surveySchema = new mongoose.Schema({
  surveyId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  questions: [questionSchema]
}, {
  timestamps: true
});

const Question = mongoose.model('Question', questionSchema);
const Survey = mongoose.model('Survey', surveySchema);

module.exports = { Question, Survey };