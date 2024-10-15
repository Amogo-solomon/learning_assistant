import React from 'react';
import { FaArrowRight } from 'react-icons/fa'; // Importing an icon from React Icons

const InputForm = ({ input, setInput }) => (
  <div className="flex flex-col"> {/* Flex container in column direction */}
    <div className="flex items-center mb-2"> {/* Row for button and label */}
      {/* Button with icon */}
      <button
        onClick={() => window.location.reload()} // Refresh the page on click
        className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700 transition duration-200 flex items-center mr-2"
      >
        <FaArrowRight className="mr-1 text-sm" /> {/* Icon with some margin to the right */}
        Click to Use
      </button>
      
      <label htmlFor="input" className="text-sm font-medium text-gray-700"> {/* Label for the input */}
        Enter any topic to generate quizzes and flashcards automatically
      </label>
    </div>
    
    {/* Input field in a separate row */}
    <input
      id="input"
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="mt-1 p-2 border border-gray-300 rounded w-full" // Full width input with some margin
    />
  </div>
);

export default InputForm;
