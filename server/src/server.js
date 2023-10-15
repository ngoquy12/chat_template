const express = require("express");
const port = 8080;
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const { createServer } = require("http");
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// user library
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();
app.use(cors());

// Import router
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const roomRouter = require("./routes/room.routes");
const chatRouter = require("./routes/chat.routes");
const friendRouter = require("./routes/friend.routes");

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat-message", (message) => {
    io.emit("newMessage", message);
  });
});

// use router
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/friends", friendRouter);

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
