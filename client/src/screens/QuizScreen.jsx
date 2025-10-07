import React, { useState, useEffect } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import Question from '../components/Question';
import ProgressBar from '../components/ProgressBar';

const QuizScreen = () => {
  const { quizState, dispatch } = useQuiz();
  const { questions, currentQuestionIndex, userAnswers } = quizState;
  
  // --- NEW: State to track if the current question has been answered ---
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const userAnswer = userAnswers[currentQuestionIndex];

  // --- NEW: Reset answered state when the question changes ---
  useEffect(() => {
    setIsAnswered(userAnswer !== null);
  }, [currentQuestionIndex, userAnswer]);

  const handleAnswerSelect = (answer) => {
    if (isAnswered) return; // Don't allow changing the answer
    setIsAnswered(true);
    dispatch({ type: 'ANSWER_QUESTION', payload: { answer } });
  };

  // --- UPDATED: Pass new props down to the Question component ---
  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
      </div>
      <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
      <Question
        questionData={currentQuestion}
        userAnswer={userAnswer}
        onSelectAnswer={handleAnswerSelect}
        isAnswered={isAnswered} // Pass down the answered state
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
          {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuizScreen;