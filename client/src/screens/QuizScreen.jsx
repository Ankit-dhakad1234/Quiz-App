import React from 'react';
import { useQuiz } from '../hooks/useQuiz';
import Question from '../components/Question';
import ProgressBar from '../components/ProgressBar';

const QuizScreen = () => {
  const { quizState, dispatch } = useQuiz();
  const { questions, currentQuestionIndex, userAnswers } = quizState;

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleAnswerSelect = (answer) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: { answer } });
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
      </div>
      <ProgressBar current={currentQuestionIndex + 1} total={totalQuestions} />
      <Question
        questionData={currentQuestion}
        userAnswer={userAnswers[currentQuestionIndex]}
        onSelectAnswer={handleAnswerSelect}
      />
      <div className="navigation">
        <button
          className="btn btn-secondary"
          onClick={() => dispatch({ type: 'PREV_QUESTION' })}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          className="btn"
          onClick={() => dispatch({ type: 'NEXT_QUESTION' })}
        >
          {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuizScreen;