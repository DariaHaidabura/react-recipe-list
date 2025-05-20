import React, { useState, useEffect, useRef } from "react";
import "./Quiz.css";

const getInitialState = () => {
  const saved = localStorage.getItem("quizState");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse quiz state", e);
    }
  }
  return {
    quizData: [
      {
        question: "What is the capital of France?",
        answers: ["New York", "London", "Paris", "Dublin"],
        correctIndex: 2,
      },
      {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Venus"],
        correctIndex: 1,
      },
      {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correctIndex: 3,
      },
    ],
    currentIndex: 0,
    selectedIndex: null,
    result: 0,
  };
};

export default function Quiz() {
  //   const arr = [
  //     {
  //       question: "What is the capital of France?",
  //       answers: ["New York", "London", "Paris", "Dublin"],
  //       correctIndex: 2,
  //     },
  //     {
  //       question: "Which planet is known as the Red Planet?",
  //       answers: ["Earth", "Mars", "Jupiter", "Venus"],
  //       correctIndex: 1,
  //     },
  //     {
  //       question: "What is the largest ocean on Earth?",
  //       answers: ["Atlantic", "Indian", "Arctic", "Pacific"],
  //       correctIndex: 3,
  //     },
  //   ];
  const {
    quizData: initialQuiz,
    currentIndex: initialIndex,
    selectedIndex: initialSelected,
    result: initialResult,
  } = getInitialState();

  const [quizData, setQuizData] = useState(initialQuiz);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [result, setResult] = useState(initialResult);
  const [selectedIndex, setSelectedIndex] = useState(initialSelected);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    const dataToSave = {
      quizData,
      currentIndex,
      selectedIndex,
      result,
    };
    localStorage.setItem("quizState", JSON.stringify(dataToSave));
  }, [quizData, currentIndex, selectedIndex, result]);

    useEffect(() => {
      if (timeLeft == 0) {
        handleNext();
        return;
      }

      if (selectedIndex !== null) {
        return;
      }

      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }, [timeLeft]);

    useEffect(() => {
      setTimeLeft(15);
    }, [currentIndex]);

  const checkAnswers = (index) => {
    setSelectedIndex(index);

    if (index === quizData[currentIndex].correctIndex) {
      setResult((prev) => prev + 1);
    }
  };

  const getAnswerClass = (index) => {
    const correct = quizData[currentIndex].correctIndex;
    if (selectedIndex == correct) {
    }
    if (selectedIndex === null) return "quiz-option";

    if (index === correct) {
      return "quiz-option correct";
    }

    if (index === selectedIndex && index !== correct) {
      return "quiz-option wrong";
    }
    return "quiz-option";
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
    setSelectedIndex(null);
  };

  const percent = Math.floor((result / quizData.length) * 100);
  const differencePercent = Math.floor(100 - percent);

  let resultCompliment;
  if (percent === 0) {
    resultCompliment = "Better luck next time!";
  } else if (percent > 0 && percent < 50) {
    resultCompliment = "Keep practicing!";
  } else if (percent >= 50 && percent < 100) {
    resultCompliment = "Good job!";
  } else {
    resultCompliment = "Excellent!";
  }

  const handleRestart = () => {
    localStorage.removeItem("quizState");
    setQuizData(getInitialState().quizData);
    setCurrentIndex(0);
    setResult(0);
    setSelectedIndex(null);
    setTimeLeft(15)
  };

  return (
    <div className="quiz-container">
      {currentIndex < quizData.length ? (
        <div>
          <p className="quiz-progress">
            Question {currentIndex + 1} of {quizData.length}
          </p>
          <p className="quiz-timer">{timeLeft} sec </p>
          <h3 className="quiz-question">{quizData[currentIndex].question}</h3>

          <div className="quiz-options">
            {quizData[currentIndex].answers.map((answer, index) => (
              <button
                key={index}
                className={getAnswerClass(index)}
                onClick={() => checkAnswers(index)}
                disabled={selectedIndex !== null}
              >
                {answer}
              </button>
            ))}
            <button
              onClick={() => handleNext(currentIndex)}
              className="quiz-next"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="quiz-container-result ">
          <p className="result-title-compliment">{resultCompliment}</p>
          <h3
            style={{
              width: "200px",
              color: "black",
              marginTop: "-80px",
              marginLeft: "70px",
              paddingBottom: "30px",
            }}
          >
            Quiz Result
          </h3>
          <p className="result-title">
            You answered correctly {result} out of {quizData.length}.{" "}
          </p>

          <div
            className="result-circle"
            style={{
              background:
                percent === 0
                  ? "#e5e7eb"
                  : `conic-gradient(#22c55e ${percent}%, #e5e7eb ${differencePercent}%)`,
            }}
          >
            <span className="percent-text">{percent}%</span>
          </div>
        </div>
      )}
      <button onClick={handleRestart} className="try-again-button">Try Again</button>
    </div>
  );
}
