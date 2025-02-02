import React, { useState, useEffect } from "react";

function QuizCard({ question, nextQuestion, prevQuestion, updateScore, questionNumber }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setFeedback(null);
    setAnswered(false);
  }, [question]);

  if (!question || !question.description) {
    return <p className="text-muted text-center">Loading question...</p>;
  }

  const handleOptionClick = (option) => {
    if (answered) return;

    setSelectedOption(option);
    const isCorrect = option.is_correct;
    setFeedback(isCorrect ? "Correct!" : "Wrong!");
    updateScore(isCorrect);
    setAnswered(true);
  };

  const handleSaveScore = () => {
    if (answered) {
      nextQuestion();
    }
  };

  return (
    <div className="card bg-dark text-white shadow-lg p-4 mt-4 rounded" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div className="card-body text-center">
        <h2 className="card-title text-warning mb-3" style={{ fontSize: "1.25rem" }}>
          Question {questionNumber}: {question.description}
        </h2>

        <div className="mt-3 text-start">
          <ol className="list-unstyled">
            {question.options && question.options.length > 0 ? (
              question.options.map((option, index) => (
                <li
                  key={option.id}
                  className="my-2 fw-bold"
                  style={{
                    cursor: answered ? "default" : "pointer",
                    color: selectedOption?.id === option.id ? "yellow" : "white", // Yellow for selected options
                    backgroundColor: "transparent", // No background color changes
                  }}
                  onClick={() => handleOptionClick(option)}
                >
                  {index + 1}. {option.description}
                </li>
              ))
            ) : (
              <p className="text-danger text-center">No options available</p>
            )}
          </ol>
        </div>

        {feedback && (
          <div className={`mt-3 ${feedback === "Correct!" ? "text-success" : "text-danger"} fs-4`}>
            {feedback}
          </div>
        )}

        <div className="d-flex justify-content-between mt-4">
          
          <button className="btn btn-primary" onClick={handleSaveScore} disabled={!answered}>
           Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizCard;
