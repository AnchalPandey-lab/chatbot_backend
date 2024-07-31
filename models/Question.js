import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    name: { type: String, required: true },
    askedQuestion: { type: String, required: true },
    answer: { type: String, required: true },
    feedback: { type: Number, required: true, min: 1, max: 5 }
});

const Question = mongoose.model('Question', QuestionSchema);
export default Question;
