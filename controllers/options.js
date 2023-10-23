const Quiz = require('../models/quiz');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

// Create a new choice (option) for a question
const createOption = async (req, res) => {
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

    const { option, isCorrect } = req.body;

    if (!option) {
      throw new BadRequestError('Option text is required and cannot be empty');
    }

    if (isCorrect === undefined) {
      throw new BadRequestError('Option state (isCorrect) is required');
    }

    const newOption = { option, isCorrect };
    question.options.push(newOption);
    await quiz.save();

    res.status(StatusCodes.CREATED).json({ option: newOption });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// Get a specific choice (option) from a question
const getOption = async (req, res) => {
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

    const option = question.options.id(req.params.optionId);

    if (!option) {
      throw new NotFoundError(`No Option Found with id ${req.params.optionId}`);
    }

    res.status(StatusCodes.OK).json({ option });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// Update a choice (option) within a question
const updateOption = async (req, res) => {
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

    const option = question.options.id(req.params.optionId);

    if (!option) {
      throw new NotFoundError(`No Option Found with id ${req.params.optionId}`);
    }

    const { option: updatedOption, isCorrect } = req.body;

    if (updatedOption) {
      option.option = updatedOption;
    }

    if (isCorrect !== undefined) {
      option.isCorrect = isCorrect;
    }

    await quiz.save();

    res.status(StatusCodes.OK).json({ option });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// Delete a choice (option) within a question
const deleteOption = async (req, res) => {
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

    const option = question.options.id(req.params.optionId);

    if (!option) {
      throw new NotFoundError(`No Option Found with id ${req.params.optionId}`);
    }

    option.remove();
    await quiz.save();

    res.status(StatusCodes.OK).json({ message: 'Option deleted successfully' });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  createOption,
  getOption,
  updateOption,
  deleteOption,
};
