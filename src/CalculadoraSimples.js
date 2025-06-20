import React, { useState } from "react";

export default function CalculadoraSimples() {
  const [display, setDisplay] = useState("0");
  const [operand, setOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [lastInput, setLastInput] = useState("");

  const handleClick = (value) => {
    if (!isNaN(value) || value === ".") {
      if (display === "0" || lastInput === "=") {
        setDisplay(value);
      } else {
        setDisplay(display + value);
      }
      setLastInput(value);
    } else if (["+", "-", "*", "/"].includes(value)) {
      setOperand(parseFloat(display));
      setOperator(value);
      setDisplay("0");
      setLastInput(value);
    } else if (value === "=") {
      if (operator && operand !== null) {
        const current = parseFloat(display);
        let result = 0;
        switch (operator) {
          case "+": result = operand + current; break;
          case "-": result = operand - current; break;
          case "*": result = operand * current; break;
          case "/": result = current !== 0 ? operand / current : "Erro"; break;
          default: break;
        }
        setDisplay(result.toString());
        setOperand(null);
        setOperator(null);
        setLastInput("=");
      }
    } else if (value === "C") {
      setDisplay("0");
      setOperand(null);
      setOperator(null);
      setLastInput("");
    } else if (value === "+/-") {
      setDisplay((parseFloat(display) * -1).toString());
    } else if (value === "%") {
      setDisplay((parseFloat(display) / 100).toString());
    }
  };

  const buttons = [
    ["C", "+/-", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  return (
    <div style={{ maxWidth: 300, margin: "50px auto", fontFamily: "Arial" }}>
      <div style={{
        background: "#000",
        color: "#fff",
        padding: "20px",
        fontSize: "32px",
        textAlign: "right",
        borderRadius: "10px 10px 0 0"
      }}>
        {display}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "5px", padding: "10px", background: "#333", borderRadius: "0 0 10px 10px" }}>
        {buttons.flat().map((btn, index) => (
          <button
            key={index}
            onClick={() => handleClick(btn)}
            style={{
              padding: "20px",
              fontSize: "20px",
              borderRadius: "10px",
              backgroundColor: ["+", "-", "*", "/", "="].includes(btn) ? "#f90" : "#555",
              color: "#fff",
              gridColumn: btn === "0" ? "span 2" : "auto",
              border: "none",
              cursor: "pointer"
            }}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}