import React from "react";
import "./Timer.css";

const Timer = () => {
  return (
    <div className="timer-container">
      <div className="timer-display">
        <span>00:00:00</span>
      </div>
      <div className="timer-controls">
        <button className="timer-btn start-btn">Старт</button>
        <button className="timer-btn stop-btn">Стоп</button>
        <button className="timer-btn restart-btn">Рестарт</button>
      </div>
    </div>
  );
};

export default Timer;
