const { Server } = require("socket.io");

const io = new Server({
  cors: "http://localhost:5173",
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendMessage", (data) => {
    const { UserSendId, UserReceiverId, Content } = data;
    const newMessage = { UserSendId, UserReceiverId, Content };

    // Sau đó gửi tin nhắn đến tất cả các người dùng kết nối
    io.emit("getMessage", newMessage);
  });

  socket.on("newNotification", (data) => {
    const { UserSendId, UserReceiverId, message } = data;

    const response = { UserSendId, UserReceiverId, message };

    // Sau đó gửi tin nhắn đến tất cả các người dùng kết nối
    io.emit("notification", { response });
  });

  // Xử lý sự kiện disconnect ở đây
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

io.listen(3000);
