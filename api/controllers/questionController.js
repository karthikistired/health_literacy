const Question = require('../models/question.model');

const createQuestion = async (req, res) => {
    const { question_text, question_type, options } = req.body;

    try {
        const question = new Question({
            question_text,
            question_type,
            options
        });

        await question.save();
        res.json(question);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    createQuestion,
    getQuestions
};
