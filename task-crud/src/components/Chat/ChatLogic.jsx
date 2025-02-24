import { useState } from "react";
import qaData from "@/data/qaData.json";

const ChatLogic = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    if (!message.trim()) return;

    const userMessage = { text: message, sender: "user" };
    let botReply = "I will get back to you on that.";

    const lowerCaseMessage = message.toLowerCase().trim();

    if (qaData[lowerCaseMessage]) {
      botReply = qaData[lowerCaseMessage];
    }

    const botMessage = { text: botReply, sender: "bot" };

    setMessages((prev) => [...prev, userMessage, botMessage]);
  };

  return { messages, handleSendMessage };
};

export default ChatLogic;
