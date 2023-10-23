const express = require('express');
const router = express.Router();
const {
  getSolvedQuiz,
  getAllSolvedQuiz,
} = require('../controllers/solvedQuiz');

router.route('/').get(getAllSolvedQuiz);
router.route('/:id').get(getSolvedQuiz).

module.exports = router;
