const express = require('express');
const router = express.Router();
const { saveSurvey, getSurvey } = require('../controllers/surveyController');

// Define the route to save a survey
router.post('/saveSurvey', saveSurvey);

// Define the route to get a survey
router.get('/getSurvey', getSurvey);

module.exports = router;