const express = require('express');
const router = express.Router();
const { createQuestion, getQuestions } = require('../controllers/questionController');

// Create question
router.post('/', createQuestion);

// Get all questions
router.get('/', getQuestions);

module.exports = router;
