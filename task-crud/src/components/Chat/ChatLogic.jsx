import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import qaData from "@/data/qaData.json";

const socket = io("http://localhost:3000");

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

  useEffect(() => {
    // Register as a buyer
    socket.emit("register-buyer");

    // Listen for bot and admin responses
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const handleSendMessage = (message) => {
    if (!message.trim()) return;

    const userMessage = { text: message, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    const questionId = findMatchingQuestion(message);

    if (questionId && qaData[questionId]) {
      const botReply = { text: qaData[questionId].answer, sender: "bot" };
      setMessages((prev) => [...prev, botReply]);
      setCurrentQuestions(qaData[questionId].questions || []);
    } else {
      // Use Socket.IO for real-time chat when no predefined answer is found
      socket.emit("message", { text: message, sender: "user", buyerId: socket.id });

      setMessages((prev) => [
        ...prev,
        { text: "Connecting to live chat...", sender: "bot" },
      ]);

      setCurrentQuestions([]);
    }
  };

  return { messages, handleSendMessage, currentQuestions };
};

export default ChatLogic;