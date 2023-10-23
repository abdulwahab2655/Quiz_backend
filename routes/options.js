const express = require('express');
const router = express.Router();
const {
  createOption,
  getOption,
  updateOption,
  deleteOption,
} = require('../controllers/options');

router.route('/:quizId/:questionId').post(createOption);
router
  .route('/:quizId/:questionId/:optionId')
  .get(getOption)
  .patch(updateOption)
  .delete(deleteOption);

module.exports = router;
