const Quiz = require('../models/quiz');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    if (quizzes.length === 0) {
      throw new NotFoundError(`No Quiz Found`);
    }
    res.status(StatusCodes.OK).json({ quizzes });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      throw new NotFoundError(`No Quiz Found with id ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ quiz });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;
    if (!title) {
      throw new BadRequestError('Title is required and cannot be empty ');
    }
    if (!questions || questions.length === 0) {
      throw new BadRequestError('Question is required and cannot be empty ');
    }
    for (const question of questions) {
      if (!question.question) {
        throw new BadRequestError(
          'Question text is required and cannot be empty'
        );
      }

      if (!question.options || question.options.length === 0) {
        throw new BadRequestError(
          'Options are required for each question and cannot be empty'
        );
      }

      for (const option of question.options) {
        if (!option.option) {
          throw new BadRequestError(
            'Option text is required and cannot be empty'
          );
        }
      }
    }
    const quiz = await Quiz.create(req.body);
    res.status(StatusCodes.CREATED).json({ quiz });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const updateQuiz = async (req, res) => {
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedQuiz) {
      throw new NotFoundError(`No Quiz Found with id ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ updatedQuiz });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndRemove(req.params.id);
    if (!deletedQuiz) {
      throw new NotFoundError(`No Quiz Found with id ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
module.exports = {
  getAllQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
};
