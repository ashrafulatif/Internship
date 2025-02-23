"use client";
import { useEffect, useState } from "react";
import { Box, IconButton, TextField, Typography, Paper } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { io } from "socket.io-client";

let socket;

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/api/socket"); // Ensure the server initializes

    socket = io({
      path: "/api/socket",
    });

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = { text: message, sender: "user" };
      setMessages([...messages, newMessage]);
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
      }}
    >
      {/* Floating Chat Icon */}
      {!isOpen && (
        <IconButton
          onClick={() => setIsOpen(true)}
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": { backgroundColor: "primary.dark" },
            width: 56,
            height: 56,
          }}
        >
          <ChatIcon />
        </IconButton>
      )}

      {/* Chat Box */}
      {isOpen && (
        <Paper
          elevation={4}
          sx={{
            position: "fixed",
            bottom: 80,
            right: 20,
            width: 300,
            p: 2,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="h6">Chat</Typography>
            <IconButton onClick={() => setIsOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages Display */}
          <Box
            sx={{
              height: 200,
              overflowY: "auto",
              border: "1px solid #ccc",
              borderRadius: 1,
              p: 1,
              mb: 1,
              backgroundColor: "#f9f9f9",
            }}
          >
            {messages.map((msg, index) => (
              <Typography
                key={index}
                sx={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  backgroundColor:
                    msg.sender === "user" ? "#d1e7ff" : "#e0e0e0",
                  p: 1,
                  borderRadius: 1,
                  my: 0.5,
                  display: "inline-block",
                }}
              >
                {msg.text}
              </Typography>
            ))}
          </Box>

          {/* Input Field */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              size="small"
              variant="outlined"
              fullWidth
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <IconButton color="primary" onClick={handleSendMessage}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ChatPopup;
