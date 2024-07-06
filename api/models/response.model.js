const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
    survey_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Survey',
        required: true
    },
    responses: [{
        question_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        },
        answer: {
            type: String,
            required: true
        }
    }]
});

module.exports = Response = mongoose.model('Response', ResponseSchema);
