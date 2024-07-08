const express = require('express');
const router = express.Router();
const responseController = require('../controllers/responseController');

// Route to get all responses for a specific survey
router.get('/:surveyId', responseController.getSurveyResponses);

// Route to save a response
router.post('/saveresponse', responseController.saveResponse);

module.exports = router;
