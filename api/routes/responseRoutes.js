const express = require('express');
const router = express.Router();
const { submitResponse, getResponses } = require('../controllers/responseController');

// Submit response
router.post('/', submitResponse);

// Get all responses for a survey
router.get('/:survey_id', getResponses);

module.exports = router;
