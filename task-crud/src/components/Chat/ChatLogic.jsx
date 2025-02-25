import { useState } from "react";
import qaData from "@/data/qaData.json";

const findMatchingQuestion = (input) => {
  const lowerInput = input.toLowerCase().trim();

  for (let key in qaData) {
    if (qaData[key]?.questions) {
      for (let question of qaData[key].questions) {
        if (question.text.toLowerCase() === lowerInput) {
          return question.id;
        }
      }
    }
  }

  return null;
};

const ChatLogic = () => {
  const [messages, setMessages] = useState([]);
  const [currentQuestions, setCurrentQuestions] = useState(
    qaData.initial.questions
  );

  const handleSendMessage = (message) => {
    if (!message.trim()) return;

    const userMessage = { text: message, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    const questionId = findMatchingQuestion(message);

    if (questionId && qaData[questionId]) {
      const botReply = { text: qaData[questionId].answer, sender: "bot" };
      setMessages((prev) => [...prev, botReply]);

      // Update current questions with the next related questions
      setCurrentQuestions(qaData[questionId].questions || []);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: "I will get back to you on that. Thank you! For emergencies, please call 1247!",
          sender: "bot",
        },
      ]);
      setCurrentQuestions([]); // Reset follow-up questions if there's no match
    }
  };

  return { messages, handleSendMessage, currentQuestions };
};

export default ChatLogic;
