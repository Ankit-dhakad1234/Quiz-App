import React, { useEffect, useState } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import { fetchFeedback } from "../services/QuizServices.js";
import Loader from '../components/Loader';

const ResultsScreen = () => {
  const { quizState, dispatch } = useQuiz();
  const { score, questions, topic } = quizState;
  const [feedback, setFeedback] = useState('');
  const [loadingFeedback, setLoadingFeedback] = useState(true);

  useEffect(() => {
    const getFeedback = async () => {
      try {
        setLoadingFeedback(true);
        const aiFeedback = await fetchFeedback(topic, score);
        setFeedback(aiFeedback);
      } catch (error) {
        setFeedback("We couldn't generate feedback, but great job on completing the quiz!");
      } finally {
        setLoadingFeedback(false);
      }
    };
    if (topic && score !== null) {
      getFeedback();
    }
  }, [score, topic]);

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="results-container">
      <h2>Quiz Complete!</h2>
      <p className="score-text">You scored</p>
      <div className="score-circle">
        {score} / {questions.length}
      </div>
      <p className="percentage">({percentage}%)</p>
      
      <div className="feedback-box">
        <h3>Personalized Feedback</h3>
        {loadingFeedback ? (
          <Loader message="Generating feedback..." />
        ) : (
          <p>{feedback}</p>
        )}
      </div>

      <button className="btn" onClick={() => dispatch({ type: 'RESET_QUIZ' })}>
        Play Again
      </button>
    </div>
  );
};

export default ResultsScreen;