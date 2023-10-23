const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  option: {
    type: String,
    required: [true, 'Option text is required and cannot be empty'],
  },
  isCorrect: {
    type: Boolean,
    required: [true, 'Option state is required and cannot be empty'],
  },
});

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required and cannot be empty'],
  },
  options: [optionSchema],
});
const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required and cannot be empty'],
  },
  questions: [questionSchema],
});

module.exports = mongoose.model('Quiz', quizSchema);
