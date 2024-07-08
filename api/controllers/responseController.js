const Response = require('../models/response.model');
const Survey = require('../models/question.model');

const getSurveyResponses = async (req, res) => {
  const { surveyId } = req.params;
  console.log('Received request for surveyId:', surveyId); // Log the received surveyId

  try {
    // Find the survey by surveyId
    const survey = await Survey.findOne({ surveyId }).populate('questions').exec();
    if (!survey) {
      console.log('Survey not found for surveyId:', surveyId);
      return res.status(404).json({ message: 'Survey not found' });
    }
    console.log('Survey found:', survey);

    // Find all responses for the survey
    const responses = await Response.find({ surveyId }).exec();
    if (!responses.length) {
      console.log('No responses found for surveyId:', surveyId);
      return res.status(404).json({ message: 'No responses found for this survey' });
    }
    console.log('Responses found:', responses);

    // Format the responses to include question texts
    const formattedResponses = responses.map(response => {
      const formattedResponse = {
        userId: response.userId,
        responses: response.responses.map(r => {
          const question = survey.questions.find(q => q.id === r.questionId);
          return {
            questionText: question ? question.questionText : 'Unknown Question',
            answer: r.answer
          };
        })
      };
      return formattedResponse;
    });

    console.log('Formatted responses:', formattedResponses);
    res.json(formattedResponses);
  } catch (error) {
    console.error('Error fetching survey responses:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const saveResponse = async (req, res) => {
  const { userId, surveyId, responses } = req.body;
  console.log('Received response for surveyId:', surveyId, 'from userId:', userId);

  try {
    const newResponse = new Response({
      userId,
      surveyId,
      responses
    });

    await newResponse.save();
    console.log('Response saved:', newResponse);
    res.status(201).json({ message: 'Response saved successfully' });
  } catch (error) {
    console.error('Error saving response:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getSurveyResponses,
  saveResponse
};