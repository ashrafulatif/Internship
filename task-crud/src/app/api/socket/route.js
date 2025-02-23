import { Server } from "socket.io";

let io;

const predefinedQA = {
  hello: "Hi there! How can I help you?",
  "what is your name": "I'm a ChatBot!",
  "how are you": "I'm doing great, thanks for asking!",
  bye: "Goodbye! Have a nice day!",
};

export async function GET(req) {
  if (!io) {
    io = new Server(globalThis.server, {
      path: "/api/socket",
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      console.log("User connected");

      socket.on("sendMessage", (message) => {
        console.log("User:", message);

        // Check predefined Q&A
        const reply = predefinedQA[message.toLowerCase()] || null;
        if (reply) {
          io.emit("receiveMessage", { text: reply, sender: "bot" });
        }
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });

    globalThis.io = io; // Store it globally to prevent multiple instances
  }

  return new Response("Socket.IO Server Initialized", { status: 200 });
}
