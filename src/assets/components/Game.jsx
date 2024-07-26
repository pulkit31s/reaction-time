import React, { useState, useEffect } from "react";

export default function Component() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [quizSolved, setQuizSolved] = useState(false);
  const [questions, setQuestions] = useState([]);

  const generateQuestion = () => {
    const operators = ['+', '-', '*', '/'];
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let question = '';
    let answer = 0;

    switch (operator) {
      case '+':
        question = `What is ${num1} + ${num2}?`;
        answer = num1 + num2;
        break;
      case '-':
        question = `What is ${num1} - ${num2}?`;
        answer = num1 - num2;
        break;
      case '*':
        question = `What is ${num1} * ${num2}?`;
        answer = num1 * num2;
        break;
      case '/':
        question = `What is ${num1} / ${num2}?`;
        answer = (num1 / num2).toFixed(2);
        break;
      default:
        break;
    }

    const options = [
      (answer - 1).toString(),
      answer.toString(),
      (parseInt(answer) + 1).toString(),
    ].sort(() => Math.random() - 0.5);

    return {
      question,
      options,
      answer: options.indexOf(answer.toString()),
    };
  };

  useEffect(() => {
    const generatedQuestions = [];
    for (let i = 0; i < 5; i++) { 
      generatedQuestions.push(generateQuestion());
    }
    setQuestions(generatedQuestions);
    setStartTime(new Date().getTime());
  }, []);

  const handleAnswerClick = (index) => {
    if (questions.length === 0) return; 

    setSelectedAnswer(index);
    if (index === questions[currentQuestion]?.answer) { 
      setScore((prevScore) => prevScore + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizSolved(true);
      setEndTime(new Date().getTime());
    }
  };

  const totalTime = endTime ? (endTime - startTime) / 1000 : 0;

  if (!quizSolved) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background">
        <div className="bg-card rounded-lg shadow-lg p-8 w-full max-w-md">
          {questions.length > 0 ? (  
            <>
              <h2 className="text-2xl font-bold mb-4">
                Question {currentQuestion + 1} of {questions.length}
              </h2>
              <p className="text-lg mb-4">{questions[currentQuestion]?.question}</p>
              <div className="grid grid-cols-1 gap-4">
                {questions[currentQuestion]?.options.map((option, index) => (
                  <button
                    key={index}
                    className={`bg-card-foreground text-card hover:bg-black hover:text-white hover:text-primary-foreground rounded-lg py-2 px-4 transition-colors ${
                      selectedAnswer === index ? "bg-green-400 text-primary-white" : ""
                    }`}
                    onClick={() => handleAnswerClick(index)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p>Loading questions...</p> 
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background">
        <div className="bg-card rounded-lg shadow-lg p-8 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <p className="text-lg mb-4">Your score: {score} out of {questions.length}</p>
          <p className="text-lg mb-4">Total time: {totalTime.toFixed(2)} seconds</p>
        </div>
      </div>
    );
  }
}
