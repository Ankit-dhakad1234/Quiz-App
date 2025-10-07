import React, { useState, useEffect } from 'react';
import { QuizProvider } from './context/QuizContext';
// CORRECT
import { useQuiz } from "./hooks/useQuiz";
import TopicScreen from './screens/TopicScreen';
import QuizScreen from './screens/QuizScreen';
import ResultsScreen from './screens/ResultsScreen';
import Loader from './components/Loader';

function AppContent() {
  const { quizState } = useQuiz();
  // ... (renderScreen function remains the same)
  const renderScreen = () => {
    if (quizState.error) {
      return ( <div>...</div> );
    }
    if (quizState.isLoading) {
      return <Loader message="Generating your quiz..." />;
    }
    if (quizState.questions.length === 0) {
      return <TopicScreen />;
    }
    if (quizState.currentQuestionIndex < quizState.questions.length) {
      return <QuizScreen />;
    }
    return <ResultsScreen />;
  };
  return <div className="app-container">{renderScreen()}</div>;
}

function App() {
  // --- NEW: Dark Mode State and Logic ---
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prevMode => !prevMode);
  
  return (
    <QuizProvider>
      {/* --- NEW: Dark Mode Toggle Button --- */}
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {isDarkMode ? '☀️' : '🌙'}
      </button>
      <AppContent />
    </QuizProvider>
  );
}

export default App;