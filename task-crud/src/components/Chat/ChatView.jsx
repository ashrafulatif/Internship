"use client";
import { useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Paper,
  Avatar,
  Button,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import ChatLogic from "@/components/Chat/ChatLogic";
import UserIcon from "@mui/icons-material/Person";
import BotIcon from "@mui/icons-material/Computer";
import { Typewriter } from "react-simple-typewriter";

const ChatView = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { messages, handleSendMessage, currentQuestions } = ChatLogic();

  return (
    <Box sx={{ position: "fixed", bottom: 20, right: 20 }}>
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

      {isOpen && (
        <Paper
          elevation={4}
          sx={{
            position: "fixed",
            bottom: 80,
            right: 20,
            width: 370,
            p: 2,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="h6">Chat</Typography>
            <IconButton onClick={() => setIsOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ height: 380, overflowY: "auto", p: 1, mb: 1 }}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: msg.sender === "user" ? "row-reverse" : "row",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                {msg.sender === "user" ? (
                  <Avatar sx={{ bgcolor: "#1976d2", ml: 1 }}>
                    <UserIcon />
                  </Avatar>
                ) : (
                  <Avatar sx={{ bgcolor: "#e0e0e0", mr: 1 }}>
                    <BotIcon />
                  </Avatar>
                )}

                <Typography
                  sx={{
                    backgroundColor:
                      msg.sender === "user" ? "#1976d2" : "#e0e0e0",
                    p: 1,
                    borderRadius: 1,
                    maxWidth: "80%",
                    wordWrap: "break-word",
                    color: msg.sender === "user" ? "#fff" : "#000",
                  }}
                >
                  {msg.sender === "bot" && typeof msg.text === "string" ? (
                    <Typewriter
                      words={[msg.text]}
                      loop={1}
                      typeSpeed={90}
                      cursor={false}
                    />
                  ) : (
                    msg.text
                  )}
                </Typography>
              </Box>
            ))}

            {/* Render dynamic follow-up questions */}
            {currentQuestions.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  mt: 2,
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  Would you like to ask one of these questions?
                </Typography>
                {currentQuestions.map((question) => (
                  <Button
                    key={question.id}
                    variant="outlined"
                    size="small"
                    onClick={() => handleSendMessage(question.text)}
                  >
                    {question.text}
                  </Button>
                ))}
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage(message);
                  setMessage("");
                }
              }}
            />
            <IconButton
              color="primary"
              onClick={() => {
                handleSendMessage(message);
                setMessage("");
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ChatView;
