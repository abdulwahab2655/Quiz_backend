const solvedQuiz = require('../models/UserQuiz');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

const getSolvedQuiz = async (req, res) => {
  try {
    const quiz = await solvedQuiz.findById(req.params.id);

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

const getAllSolvedQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.find({});

    if (!quizzes || quizzes.length === 0) {
      throw new NotFoundError('No Quizzes Found');
    }

    res.status(StatusCodes.OK).json({ quizzes });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  getSolvedQuiz,
  getAllSolvedQuiz,
};
