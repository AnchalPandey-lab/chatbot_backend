import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

// Get all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new question
router.post('/', async (req, res) => {
    const { name, askedQuestion, answer, feedback } = req.body;

    // Validate feedback
    if (feedback < 0 || feedback > 5) {
        return res.status(400).json({ message: 'Feedback must be between 1 and 5' });
    }

    const question = new Question({
        name,
        askedQuestion,
        answer,
        feedback
    });

    try {
        const newQuestion = await question.save();
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a question
router.patch('/:id', async (req, res) => {
    const { name, askedQuestion, answer, feedback } = req.body;

    // Validate feedback
    if (feedback && (feedback < 0 || feedback > 5)) {
        return res.status(400).json({ message: 'Feedback must be between 1 and 5' });
    }

    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        if (name != null) {
            question.name = name;
        }
        if (askedQuestion != null) {
            question.askedQuestion = askedQuestion;
        }
        if (answer != null) {
            question.answer = answer;
        }
        if (feedback != null) {
            question.feedback = feedback;
        }

        const updatedQuestion = await question.save();
        res.json(updatedQuestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a question
router.delete('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        await question.remove();
        res.json({ message: 'Question deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
