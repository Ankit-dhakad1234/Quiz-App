import React from 'react';

const Question = ({ questionData, userAnswer, onSelectAnswer }) => {
  return (
    <div className="question-container">
      <h2
        className="question-text"
        dangerouslySetInnerHTML={{ __html: questionData.question }}
      />
      <div className="options-grid">
        {questionData.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${userAnswer === option ? 'selected' : ''}`}
            onClick={() => onSelectAnswer(option)}
            dangerouslySetInnerHTML={{ __html: option }}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;