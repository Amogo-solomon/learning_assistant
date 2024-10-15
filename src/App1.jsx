import React, { useState, useEffect } from 'react';
import { getQuizQuestions, getFlashcards, getProgressRecommendations } from './api/gemini';
import QuizComponent from './components/QuizComponent';
import FlashcardComponent from './components/FlashcardComponent';
import ProgressComponent from './components/ProgressComponent';
import InputForm from './components/InputForm';
import { processFileContent } from './utils/fileProcessor'; 
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; 

function App() {
  // States (same as before)

  // Handle quiz generation
  const handleQuiz = async () => {
    const inputData = fileContent || input;
    setLoadingQuiz(true); 
    try {
      const result = await getQuizQuestions(inputData);
      setQuestions(result);
    } catch (error) {
      console.error('Failed to fetch quiz questions:', error);
    } finally {
      setLoadingQuiz(false); 
    }
  };

  // Handle flashcards generation
  const handleFlashcards = async () => {
    const inputData = fileContent || input; 
    setLoadingFlashcards(true); 
    try {
      const result = await getFlashcards(inputData);
      setFlashcards(result);
    } catch (error) {
      console.error('Failed to fetch flashcards:', error);
    } finally {
      setLoadingFlashcards(false); 
    }
  };

  // Handle recommendations
  const handleRecommendations = async () => {
    const inputData = JSON.stringify({ quizzesCompleted: quizResults.length, flashcardsLearned });
    setLoadingRecommendations(true); 
    try {
      const result = await getProgressRecommendations(inputData);
      setRecommendations(formatResponse(result));
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
    } finally {
      setLoadingRecommendations(false); 
    }
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);

    // Process file to extract text content
    const content = await processFileContent(uploadedFile);
    setFileContent(content);
  };

  // UI Code
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">AI Learning Assistant</h1>

      {/* Input form for user input */}
      <InputForm input={input} setInput={setInput} />

      {/* File upload functionality */}
      <div className="my-4">
        <label htmlFor="file-upload" className="block mb-2 text-sm font-medium text-gray-700">
          Upload a Document (Optional):
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
        />
        <small className="text-gray-600">Upload a study document to generate quiz and flashcards automatically!</small>
      </div>

      {/* Buttons for different functionalities */}
      <div className="flex gap-4 mb-4 mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            handleQuiz();
            scrollToSection('quiz');
          }}
        >
          Get Quiz
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => {
            handleFlashcards();
            scrollToSection('flashcards');
          }}
        >
          Get Flashcards
        </button>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded"
          onClick={() => {
            handleRecommendations();
            scrollToSection('progress');
          }}
        >
          Get Recommendations
        </button>
      </div>

      {/* Display action instructions */}
      <div className="text-sm text-gray-700 mb-4">
        <p>Not sure what to do?</p>
        <ul className="list-disc list-inside">
          <li>Click <strong>Get Quiz</strong> to generate a quiz based on the uploaded document or text you entered.</li>
          <li>Click <strong>Get Flashcards</strong> to generate interactive flashcards from your material.</li>
          <li>Click <strong>Get Recommendations</strong> to receive personalized learning tips based on your progress.</li>
        </ul>
      </div>

      {/* Conditional rendering with loading spinners */}
      <div id="quiz">
        {loadingQuiz ? (
          <div className="flex justify-center items-center">
            <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-500" />
            <p className="ml-2 text-blue-500">Generating quiz... Hang tight!</p>
          </div>
        ) : (
          questions.length > 0 && <QuizComponent questions={questions} setQuizResults={setQuizResults} />
        )}
      </div>

      <div id="flashcards">
        {loadingFlashcards ? (
          <div className="flex justify-center items-center">
            <AiOutlineLoading3Quarters className="animate-spin text-4xl text-green-500" />
            <p className="ml-2 text-green-500">Creating flashcards... Just a moment!</p>
          </div>
        ) : (
          flashcards.length > 0 && (
            <FlashcardComponent
              flashcards={flashcards}
              setFlashcardsLearned={setFlashcardsLearned}
              markFlashcardAsLearned={markFlashcardAsLearned}
              addFlashcard={addManualFlashcard}
            />
          )
        )}
      </div>

      <div id="progress">
        {loadingRecommendations ? (
          <div className="flex justify-center items-center">
            <AiOutlineLoading3Quarters className="animate-spin text-4xl text-purple-500" />
            <p className="ml-2 text-purple-500">Fetching recommendations... Almost there!</p>
          </div>
        ) : recommendations ? (
          <ProgressComponent
            recommendations={recommendations}
            quizzesCompleted={quizResults.length}
            correctAnswers={correctAnswers}
            flashcardsLearned={flashcardsLearned}
            timeSpent={timeSpent}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
