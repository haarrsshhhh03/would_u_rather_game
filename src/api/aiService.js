import axios from "axios";

const API_KEY = "YOUR GEMINI API KEY"; // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export const fetchReaction = async (question, choice) => {
    try {
      const prompt = `React to the user's choice in a fun way. The question was: "${question}" and the user chose: "${choice}". Respond in a short, witty, and engaging manner.`;
  
      const response = await axios.post(API_URL, {
        contents: [{ parts: [{ text: prompt }] }],
      });
  
      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error fetching AI reaction:", error);
      return "Hmm... interesting choice!";
    }
  };
  export const fetchQuestion = async () => {
    try {
      const prompt = "Generate a fun and creative 'Would You Rather' question with exactly 4 unique answer choices.";
  
      const response = await axios.post(API_URL, {
        contents: [{ parts: [{ text: prompt }] }],
      });
  
      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error fetching AI question:", error);
      return "Oops! Something went wrong.";
    }
  };
