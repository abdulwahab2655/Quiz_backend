const express = require('express');
require('express-async-errors');
require('dotenv').config();
const app = express();

//connect db
const connectDB = require('./db/connect');

//router
const quizRouter = require('./routes/quizzes');
const questionRouter = require('./routes/questions');
const optionRouter = require('./routes/options');
const solvedQuizRouter=require('./routes/solvedQuiz');

// error handler
const notFoundMiddleware = require('./middleware/not-found');

// extra packages
app.use(express.json());

// routes
app.use('/api/quiz', quizRouter);
app.use('/api/question', questionRouter);
app.use('/api/option', optionRouter);
app.use('/api/solvedQuiz',solvedQuizRouter);

app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
