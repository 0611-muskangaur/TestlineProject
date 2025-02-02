import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-white text-center bg-dark">
        <img 
          src="4797726.png" // Replace with the actual image path
          alt="Quiz Logo" 
          className="img-fluid" 
          style={{ width: "100px", height: "100px" }} // Adjust size as needed
        />
              <h1 className="display-4 fw-bold mb-4 d-flex align-items-center gap-3">

        Welcome to the Quiz!
      </h1>
      <button 
        className="btn btn-primary btn-md px-4 py-2 fw-bold shadow-lg bg-gradient border-0 
                   hover-shadow-glow transition-all"
        onClick={() => navigate("/quiz")}
      >
        Start Quiz
      </button>
    </div>
  );
}

export default Home;
