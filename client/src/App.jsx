import React from 'react';
import { QuizProvider } from './context/QuizContext';
import { useQuiz } from './hooks/useQuiz';
import TopicScreen from './screens/TopicScreen';
import QuizScreen from './screens/QuizScreen';
import ResultsScreen from './screens/ResultsScreen';
import Loader from './components/Loader';

function AppContent() {
  const { quizState } = useQuiz();

  const renderScreen = () => {
    if (quizState.error) {
      return (
        <div>
          <h2>Something Went Wrong</h2>
          <p>{quizState.error}</p>
          <button className="btn" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      );
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
  return (
    <QuizProvider>
      <AppContent />
    </QuizProvider>
  );
}

export default App;