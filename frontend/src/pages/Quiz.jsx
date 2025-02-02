import React, { useState, useEffect } from "react";
import axios from "axios";
import Timer from "../components/Timer";
import QuizCard from "../components/QuizCard";
import Scoreboard from "../components/ScoreBoard";
import Loader from "../components/Loader";

function Quiz() {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [resetTimer, setResetTimer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/quiz");
        setQuiz(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  const nextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setResetTimer((prevState) => !prevState); // Reset timer
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Move to next question
    } else {
      setQuizFinished(true); // Finish quiz if it's the last question
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setResetTimer((prevState) => !prevState); // Reset timer
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1); // Go to previous question
    }
  };

  const updateScore = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1); // Increment score on correct answer
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!quiz || quiz.questions.length === 0) {
    return <p className="text-center text-danger">No questions available.</p>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white p-4">
      {quizFinished ? (
        <div className="d-flex justify-content-center mt-4">
          <div className="card shadow-lg p-4 bg-dark text-white" style={{ maxWidth: "600px", width: "100%" }}>
            <div className="card-body text-center">
              <Scoreboard score={score} />
            </div>
          </div>
        </div>
      ) : (
        <div className="row w-100">
          <div className="col-md-8 d-flex flex-column" style={{ height: '100%' }}>
            <div className="card shadow-lg p-4 mt-4 bg-dark text-white" style={{ flex: 1 }}>
              <div className="card-body text-start">
                <Timer resetTimer={resetTimer} />
                <div className="mt-3">
                  <div className="progress mb-3">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${progress}%` }}
                      aria-valuenow={progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {Math.round(progress)}%
                    </div>
                  </div>

                  {currentQuestion ? (
                    <QuizCard
                      question={currentQuestion}
                      nextQuestion={nextQuestion}
                      prevQuestion={prevQuestion}
                      updateScore={updateScore}
                      questionNumber={currentQuestionIndex + 1}
                    />
                  ) : (
                    <p className="fw-bold text-success">Quiz finished! Your score: {score}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 d-flex flex-column" >
            <div className="card shadow-lg p-4 mt-4 bg-dark text-white" style={{ flex: 1 }}>
              <div className="card-body text-center">
                <img
                  src="5773622.png" // Replace this with your image URL
                  alt="Quiz Illustration"
                  className="img-fluid"
                  style={{ height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
