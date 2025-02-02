import React from "react";

function Scoreboard({ score }) {
  // Determine message based on score
  let message = "";
  if (score > 8) {
    message = "Great job!";
  } else if (score >= 5) {
    message = "Good effort!";
  } else {
    message = "Better luck next time!";
  }

  return (
    <div className="alert alert-info text-center fs-4 fw-bold text-dark d-flex align-items-center justify-content-center p-4">
      {/* Content Container */}
      <div className="card-body d-flex align-items-center">
        {/* Left Side Content */}
        <div className="mr-4">
          <h1 className="display-4 fw-bold text-dark">Quiz Completed!</h1>
          <p className="fs-4 text-dark">
            Your score: <strong>{score}</strong>
          </p>
          <p className="fs-4 text-dark">{message}</p> {/* Display the message */}
        </div>

        {/* Right Side Image */}
        <div>
          <img
            src="2720920.png" // Replace with your image URL
            alt="Quiz Completion"
            className="img-fluid"
            style={{ maxWidth: "150px", height: "auto" }} // Adjust size as needed
          />
        </div>
      </div>
    </div>
  );
}

export default Scoreboard;
