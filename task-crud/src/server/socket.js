const { createServer } = require("http");
const { Server } = require("socket.io");

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("register-buyer", () => {
    socket.join("buyers");
    console.log("Buyer registered:", socket.id);
  });

  socket.on("register-admin", () => {
    socket.join("admins");
    console.log("Admin registered:", socket.id);
  });

  socket.on("message", (data) => {
    console.log("Received:", data);

    if (data.sender === "user") {
      // Forward the message to admins if it's from a buyer
      io.to("admins").emit("message", data);
    } else if (data.sender === "admin") {
      // Forward the admin's response to the specific buyer
      io.to(data.buyerId).emit("message", data);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Socket.IO server running on port 3000");
});
