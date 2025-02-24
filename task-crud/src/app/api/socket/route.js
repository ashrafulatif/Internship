import { Server } from "socket.io";
import { NextResponse } from "next/server";

const predefinedQA = {
  hello: "Hi there! How can I help you?",
  "what is your name": "I'm a ChatBot!",
  "how are you": "I'm doing great, thanks for asking!",
  bye: "Goodbye! Have a nice day!",
};

let io;

export async function GET() {
  if (!io) {
    io = new Server(3001, {
      path: "/api/socket",
      cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
      console.log("User connected");

      socket.on("sendMessage", (message) => {
        const text = message.toLowerCase().trim();
        
        if (predefinedQA[text]) {
          socket.emit("receiveMessage", { text: predefinedQA[text], sender: "bot" });
        } else {
          socket.emit("receiveMessage", { text: "I will get back to you on that.", sender: "bot" });
        }
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  }

  return NextResponse.json({ message: "Socket server initialized" });
}
