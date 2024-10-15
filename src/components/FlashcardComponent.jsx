import React, { useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai'; // Importing the icon
import '../styles/flashcards.css';

const FlashcardComponent = ({ flashcards, setFlashcardsLearned, markFlashcardAsLearned, addFlashcard }) => {
  const [showBack, setShowBack] = useState({}); // State to toggle showing the back of flashcards
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const toggleShowBack = (index) => {
    setShowBack((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleAddFlashcard = () => {
    if (newQuestion && newAnswer) {
      addFlashcard(newQuestion, newAnswer);
      setNewQuestion('');
      setNewAnswer('');
    }
  };

  return (
    <div className="mb-4 mb-20">
      <h2 className="text-2xl font-bold mb-4 text-center">Flashcards</h2>

      {/* Form to add new flashcard */}
      <div className="my-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="border px-2 py-1 w-1/2 rounded"
        />
        <input
          type="text"
          placeholder="Enter answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          className="border px-2 py-1 w-1/2 rounded"
        />
        <button onClick={handleAddFlashcard} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Flashcard
        </button>
      </div>

      {/* Displaying flashcards in a grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2  gap-6  ">
        {flashcards.length === 0 ? (
          <p>No flashcards available. Add some to get started!</p>
        ) : (
          flashcards.map((flashcard, index) => (
            <div key={index} className="flashcard-container relative w-full h-150 mb-6 mt-8">
              
              {/* Positioning "Click to flip" text and "Mark as Learned" button on the same row */}
              <div className="flex justify-between items-center mt-8 ">
                <small className="text-gray-500">Click to flip</small>
                <div>
                  {!flashcard.learned ? (
                    <button
                      className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-sm"
                      onClick={() => markFlashcardAsLearned(index)}
                    >
                         <small className="text-gray-500 font-bold ml-2">Mark as Learned</small>
                      <AiOutlineCheckCircle size={16} />
                    </button>
                  ) : (
                    <small className="text-gray-500 font-bold ml-2">Learned</small>
                  )}
                </div>
              </div>

              <div
                className={`flashcard relative w-full h-full mb-4 transition-transform duration-700 transform ${showBack[index] ? 'rotate-y-180' : ''}`}
                onClick={() => toggleShowBack(index)}
              >
                {/* Front side (Question) */}
                <div className="flashcard-side flashcard-front absolute w-full mt-1 bg-white border border-gray-300 rounded-lg flex items-center justify-center text-center  shadow-lg ">
                  <p className="text-lg font-semibold">{flashcard.question}</p>
                </div>

                {/* Back side (Answer) */}
                <div className="flashcard-side flashcard-back absolute w-full mt-1 bg-blue-600 text-white border border-gray-300 rounded-lg flex items-center justify-center text-center shadow-lg transform rotate-y-180">
                  <p className="text-lg font-semibold ">{flashcard.answer}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FlashcardComponent;
