import React, { useState, useEffect } from "react";
import { FaRegClock } from "react-icons/fa"; // Importing a clock icon

function Timer({ resetTimer }) {
  const [time, setTime] = useState(30);

  useEffect(() => {
    // Reset the timer to 30 seconds whenever the resetTimer prop changes
    setTime(30);

    const interval = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [resetTimer]); // Dependency on resetTimer to trigger timer reset

  return (
    <div className="text-danger text-center fs-4 fw-bold d-flex align-items-center justify-content-center gap-2">
      <FaRegClock /> {/* Timer icon added */}
      Time Left: {time}s
    </div>
  );
}

export default Timer;
