"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import AdminIcon from "@mui/icons-material/AdminPanelSettings";
import UserIcon from "@mui/icons-material/Person";
import { set } from "react-hook-form";

const socket = io("http://localhost:3000");

const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [currentBuyerId, setCurrentBuyerId] = useState(null);

  useEffect(() => {
    socket.emit("register-admin");

    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
      setCurrentBuyerId(data.buyerId);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const handleSendMessage = () => {
    if (!message.trim() || !currentBuyerId) return;

    const adminMessage = {
      text: message,
      sender: "admin",
      buyerId: currentBuyerId,
    };
    socket.emit("message", adminMessage);
    setMessages((prev) => [...prev, adminMessage]);
    setMessage("");
  };

  return (
    <Box
      sx={{
        width: "400px",
        mx: "auto",
        mt: 4,
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h5" align="center" sx={{ mb: 2 }}>
        Admin Chat
      </Typography>
      <Paper
        sx={{
          height: "300px",
          overflowY: "auto",
          p: 2,
          borderRadius: 2,
          backgroundColor: "#ffffff",
          boxShadow: 1,
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent:
                msg.sender === "admin" ? "flex-end" : "flex-start",
              alignItems: "center",
              mb: 1,
            }}
          >
            {msg.sender !== "admin" && (
              <Avatar sx={{ bgcolor: "#e0e0e0", mr: 1 }}>
                <UserIcon />
              </Avatar>
            )}
            <Typography
              sx={{
                backgroundColor: msg.sender === "admin" ? "#1976d2" : "#e0e0e0",
                color: msg.sender === "admin" ? "#fff" : "#000",
                p: 1.5,
                borderRadius: "10px",
                maxWidth: "75%",
                wordBreak: "break-word",
              }}
            >
              {msg.text}
            </Typography>
            {msg.sender === "admin" && (
              <Avatar sx={{ bgcolor: "#1976d2", ml: 1 }}>
                <AdminIcon />
              </Avatar>
            )}
          </Box>
        ))}
      </Paper>
      <Box sx={{ display: "flex", mt: 2, gap: 1 }}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage(message);
              setMessage("");
            }
          }}
          placeholder="Type a message..."
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: "#fff", borderRadius: "5px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          sx={{ minWidth: "80px" }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default AdminChat;
