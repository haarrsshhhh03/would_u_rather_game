import React, { useState } from "react";
import { fetchQuestion, fetchReaction } from "./api/aiService";
import './App.css';
import "./styles.css";


function App() {
  const [question, setQuestion] = useState("Click the button to generate a question!");
  const [options, setOptions] = useState([]);
  const [reaction, setReaction] = useState("");

  const getQuestion = async () => {
    const aiResponse = await fetchQuestion();

    // Splitting the AI response into a question and 4 options
    const lines = aiResponse.split("\n").filter(line => line.trim() !== "");
    if (lines.length >= 5) {
      setQuestion(lines[0]);
      setOptions(lines.slice(1, 5));
      setReaction(""); // Clear previous reaction
    } else {
      setQuestion("Invalid response from AI, try again.");
      setOptions([]);
      setReaction("");
    }
  };
  const handleChoice = async (choice) => {  // ✅ Ensure this function is present
    const aiReaction = await fetchReaction(question, choice);
    setReaction(aiReaction);
  };


  return (
    <div className="container">
    <h1>Would You Rather?</h1>
    <p>{question}</p>
    {options.map((option, index) => (
      <button key={index} onClick={() => handleChoice(option)}>
        {option}
      </button>
    ))}
    <br />
    <button onClick={getQuestion}>Generate New Question</button>
    {reaction && <p className="reaction">{reaction}</p>}
  </div>
    
  );
}

export default App;
