import React, { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [inputValue, setInputValue] = useState(""); // строка для ввода
  const [firstOperand, setFirstOperand] = useState(null); // первый операнд
  const [secondOperand, setSecondOperand] = useState(""); // второй операнд как строка
  const [operator, setOperator] = useState(""); // текущий оператор

  const selectOperand = (e) => {
    const value = e.target.value;
    // Если первый операнд, сохраняем его, иначе второй операнд
    if (!operator) {
      setFirstOperand(firstOperand === null ? value : firstOperand + value); // Сохраняем первый операнд как строку
      setInputValue(inputValue + value);
    } else {
      setSecondOperand(secondOperand === null ? value : secondOperand + value); // Второй операнд - строка
      setInputValue(inputValue + value);
    }
  };

  const selectOperator = (e) => {
    const value = e.target.value;
    if (firstOperand && secondOperand === "") {
      setOperator(value);
      setInputValue(inputValue + value); // добавляем оператор
    }
  };

  const handleDecimal = () => {
    // Если нет оператора (первый операнд) и еще не добавлена точка
    if (operator === "" && !inputValue.includes(".")) {
      setInputValue(inputValue + ".");
    }
    // Если есть оператор, второй операнд существует, и точка еще не добавлена
    else if (
      operator &&
      (secondOperand === "" || !secondOperand.includes("."))
    ) {
      // Добавляем точку ко второму операнду (к строке)
      setSecondOperand(secondOperand + ".");
      setInputValue(inputValue + ".");
    }
  };

  const showResult = () => {
    let result;
    if (firstOperand !== null && secondOperand !== "" && operator) {
      // вычисление в зависимости от оператора
      switch (operator) {
        case "+":
          result = parseFloat(firstOperand) + parseFloat(secondOperand);
          break;
        case "-":
          result = parseFloat(firstOperand) - parseFloat(secondOperand);
          break;
        case "*":
          result = parseFloat(firstOperand) * parseFloat(secondOperand);
          break;
        case "/":
          result = parseFloat(firstOperand) / parseFloat(secondOperand);
          break;
        default:
          break;
      }
      setInputValue(result.toString()); // показываем результат
      // сбрасываем операнды и оператор
      setFirstOperand(result.toString());
      setSecondOperand("");
      setOperator("");
    }
  };

  const restartCalculator = () => {
    setInputValue(""); // очищаем поле ввода
    setFirstOperand(null);
    setSecondOperand("");
    setOperator("");
  };

  return (
    <div className="calculator-container">
      <div className="calculator-screen">
        <input className="calculator-input" value={inputValue} readOnly />
      </div>
      <div className="calculator-buttons">
        <button onClick={selectOperand} className="calculator-btn" value={7}>
          7
        </button>
        <button onClick={selectOperand} className="calculator-btn" value={8}>
          8
        </button>
        <button onClick={selectOperand} className="calculator-btn" value={9}>
          9
        </button>
        <button
          onClick={selectOperator}
          className="calculator-btn operator"
          value={"/"}
        >
          /
        </button>

        <button onClick={selectOperand} className="calculator-btn" value={4}>
          4
        </button>
        <button onClick={selectOperand} className="calculator-btn" value={5}>
          5
        </button>
        <button onClick={selectOperand} className="calculator-btn" value={6}>
          6
        </button>
        <button
          onClick={selectOperator}
          className="calculator-btn operator"
          value={"*"}
        >
          *
        </button>

        <button onClick={selectOperand} className="calculator-btn" value={1}>
          1
        </button>
        <button onClick={selectOperand} className="calculator-btn" value={2}>
          2
        </button>
        <button onClick={selectOperand} className="calculator-btn" value={3}>
          3
        </button>
        <button
          onClick={selectOperator}
          className="calculator-btn operator"
          value={"-"}
        >
          -
        </button>

        <button onClick={selectOperand} className="calculator-btn" value={0}>
          0
        </button>
        <button onClick={handleDecimal} className="calculator-btn" value={"."}>
          .
        </button>
        <button
          onClick={showResult}
          className="calculator-btn operator"
          value={"="}
        >
          =
        </button>
        <button
          onClick={selectOperator}
          className="calculator-btn operator"
          value={"+"}
        >
          +
        </button>

        <button onClick={restartCalculator} className="calculator-btn-clear">
          C
        </button>
      </div>
    </div>
  );
}

export default Calculator;
