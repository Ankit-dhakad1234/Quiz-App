import React from 'react';

const Question = ({ questionData, userAnswer, onSelectAnswer, isAnswered }) => {
  return (
    <div className="question-container">
      <h2
        className="question-text"
        dangerouslySetInnerHTML={{ __html: questionData.question }}
      />
      <div className="options-grid">
        {questionData.options.map((option, index) => {
          
          // --- NEW: Logic to determine button style ---
          let buttonClass = 'option-button';
          if (isAnswered) {
            if (option === questionData.correctAnswer) {
              buttonClass += ' correct'; // Always show correct answer in green
            } else if (option === userAnswer) {
              buttonClass += ' incorrect'; // Show user's wrong answer in red
            } else {
              buttonClass += ' disabled'; // Disable other options
            }
          }

          return (
            <button
              key={index}
              className={buttonClass}
              onClick={() => onSelectAnswer(option)}
              disabled={isAnswered} // Disable button after answering
              dangerouslySetInnerHTML={{ __html: option }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Question;