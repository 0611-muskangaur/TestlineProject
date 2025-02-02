import React from "react";

function Options({ options, onOptionClick }) {
  return (
    <ul>
      {options && options.length > 0 ? (
        options.map((option) => (
          <li key={option.id}>
            <button onClick={() => onOptionClick(option)}>
              {option.description} {/* Render the option description */}
            </button>
          </li>
        ))
      ) : (
        <p>No options available</p>
      )}
    </ul>
  );
}

export default Options;
