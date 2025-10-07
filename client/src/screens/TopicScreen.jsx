import React from 'react';
import { useQuiz } from '../hooks/useQuiz';
import { fetchQuizQuestions } from '../services/QuizServices.js';

const topics = ['Technology', 'World History', 'Science', 'Wellness'];

const TopicScreen = () => {
  const { dispatch } = useQuiz();

  const handleTopicSelect = async (topic) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const questions = await fetchQuizQuestions(topic);
      if (questions && questions.length > 0) {
        dispatch({ type: 'START_QUIZ', payload: { questions, topic } });
      } else {
        throw new Error("Received no questions from the AI.");
      }
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message || 'An unknown error occurred.' });
    }
  };

  return (
    <div className="topic-container">
      <h1>AI Knowledge Quiz</h1>
      <p>Select a topic to start your quiz!</p>
      <div className="topic-grid">
        {topics.map((topic) => (
          <button
            key={topic}
            className="btn"
            onClick={() => handleTopicSelect(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicScreen;