import React, { useState, useEffect } from "react";
import "./Counter.css";

function Counter() {
  const [count, setCount] = useState(0);
  const [min, setMin] = useState(-5);
  const [max, setMax] = useState(10);
  const [step, setStep] = useState(1);
  const [isAuto, setIsAuto] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (isAuto) {
      const id = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount < max) {
            return prevCount + step;
          }
          return prevCount;
        });
      }, 1000);
      setIntervalId(id);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAuto, step, max]);

  const handleDecrement = () => {
    if (count > min) {
      setCount(count - step);
    }
  };

  const handleIncrement = () => {
    if (count < max) {
      setCount(count + step);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  // Обработчики для полей ввода без использования parseInt
  const handleMinChange = (e) => {
    setMin(Number(e.target.value)); // Преобразование в число
  };

  const handleMaxChange = (e) => {
    setMax(Number(e.target.value)); // Преобразование в число
  };

  const handleStepChange = (e) => {
    setStep(Number(e.target.value)); // Преобразование в число
  };

  const toggleAuto = () => {
    setIsAuto((prev) => !prev);
  };

  return (
    <div className="counter-container">
      <h1 className="counter-header">Count: {count}</h1>

      <span>Min value: {min}</span>
      <input
        type="number"
        placeholder="Min value"
        onChange={handleMinChange}
        value={min}
      />

      <span>Max value: {max}</span>
      <input
        type="number"
        placeholder="Max value"
        onChange={handleMaxChange}
        value={max}
      />

      <span>Step: {step}</span>
      <input
        type="number"
        placeholder="Step"
        onChange={handleStepChange}
        value={step}
      />

      <button
        onClick={handleDecrement}
        disabled={count <= min}
        className="counter-button counter-decrement"
      >
        -
      </button>
      <button
        onClick={handleIncrement}
        disabled={count >= max}
        className="counter-button counter-increment"
      >
        +
      </button>

      <button onClick={handleReset} className="counter-button counter-reset">
        Reset
      </button>

      <button onClick={toggleAuto} className="counter-button counter-auto">
        {isAuto ? "Stop Auto" : "Start Auto"}
      </button>
    </div>
  );
}

export default Counter;
