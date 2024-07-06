const { v4: uuidv4 } = require('uuid');
const Survey = require('../models/question.model');

// to insert the data
const saveSurvey = async (req, res) => {
  try {
    const { SurveyTitle, SurveyDesc, qs } = req.body;
    const surveyId = uuidv4(); // Generate a unique survey ID

    const survey = new Survey({
      surveyId,
      title: SurveyTitle,
      description: SurveyDesc,
      questions: qs
    });

    await survey.save();

    res.status(201).json({ message: 'Survey saved successfully', survey });
  } catch (error) {
    console.error('Error saving survey:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// to get the data 
const getSurvey = async (req, res) => {
  try {
    const survey_res = await Survey.find({});
    res.status(200).json(survey_res);
  } catch (error) {
    console.error('Error in getting the survey:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  saveSurvey, getSurvey
};