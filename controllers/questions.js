const Quiz = require('../models/quiz');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

// Create a new question for a quiz
const createQuestion = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);

    if (!quiz) {
      throw new NotFoundError(`No Quiz Found with id ${req.params.quizId}`);
    }

    const { question, options } = req.body;

    if (!question) {
      throw new BadRequestError(
        'Question text is required and cannot be empty'
      );
    }

    if (!options || options.length === 0) {
      throw new BadRequestError(
        'Options are required for the question and cannot be empty'
      );
    }

    // Validate each option
    for (const option of options) {
      if (!option.option) {
        throw new BadRequestError(
          'Option text is required and cannot be empty'
        );
      }
    }

    const newQuestion = { question, options };
    quiz.questions.push(newQuestion);
    await quiz.save();

    res.status(StatusCodes.CREATED).json({ question: newQuestion });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// Get a specific question from a quiz
const getQuestion = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);

    if (!quiz) {
      throw new NotFoundError(`No Quiz Found with id ${req.params.quizId}`);
    }

    const question = quiz.questions.id(req.params.questionId);

    if (!question) {
      throw new NotFoundError(
        `No Question Found with id ${req.params.questionId}`
      );
    }

    res.status(StatusCodes.OK).json({ question });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// Update a question within a quiz
const updateQuestion = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);

    if (!quiz) {
      throw new NotFoundError(`No Quiz Found with id ${req.params.quizId}`);
    }

    const question = quiz.questions.id(req.params.questionId);

    if (!question) {
      throw new NotFoundError(
        `No Question Found with id ${req.params.questionId}`
      );
    }

    const { question: updatedQuestion, options } = req.body;

    if (updatedQuestion) {
      question.question = updatedQuestion;
    }

    if (options) {
      question.options = options;
    }

    await quiz.save();

    res.status(StatusCodes.OK).json({ question });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// Delete a question within a quiz
const deleteQuestion = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);

    if (!quiz) {
      throw new NotFoundError(`No Quiz Found with id ${req.params.quizId}`);
    }

    const question = quiz.questions.id(req.params.questionId);

    if (!question) {
      throw new NotFoundError(
        `No Question Found with id ${req.params.questionId}`
      );
    }

    question.remove();
    await quiz.save();

    res
      .status(StatusCodes.OK)
      .json({ message: 'Question deleted successfully' });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  createQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
};
