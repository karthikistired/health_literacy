const Response = require('../models/response.model');

const submitResponse = async (req, res) => {
    const { survey_id, responses } = req.body;

    try {
        const response = new Response({
            survey_id,
            responses
        });

        await response.save();
        res.json(response);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getResponses = async (req, res) => {
    const { survey_id } = req.params;

    try {
        const responses = await Response.find({ survey_id });
        res.json(responses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    submitResponse,
    getResponses
};
