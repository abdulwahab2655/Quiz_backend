const express = require('express');
const router = express.Router();
const {
  createQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/questions');

router.route('/:quizId').post(createQuestion);
router
  .route('/:quizId/:questionId')
  .get(getQuestion)
  .patch(updateQuestion)
  .delete(deleteQuestion);

module.exports = router;
