// socketHandlers.js
const chatMessage = require("../../models/chatMessage");
const ChatMessage = require("../../models/chatMessage");
const mongoose = require("mongoose");

module.exports = function (io, socket, users) {
  console.log("A user connected:", socket.id);

  // Nhận userId từ client và lưu lại('private-message'
  socket.on("register", (userId) => {
    users[userId] = socket.id;
    console.log(`📌 Registered: ${userId} => ${socket.id}`);
  });

  // Lắng nghe gửi tin nhắn riêng
  socket.on("private-message", async ({ senderId, receiverId, message }) => {
    try {
      // Lưu tin nhắn vào DB
      const newMsg = new ChatMessage({
        senderId: senderId,
        receiverId: receiverId,
        message,
      });
      await newMsg.save();

      // Gửi lại cho người nhận nếu họ đang online
      const receiverSocket = users[receiverId];
      if (receiverSocket) {
        io.to(receiverSocket).emit("receive-message", {
          _id: newMsg._id,
          senderId,
          receiverId,
          message,
          isRead: newMsg.isRead,
          timestamp: newMsg.timestamp,
        });
      }
    } catch (error) {
      console.error("Error saving or sending private message:", error);
    }
  });

  // Server
  socket.on("markAsRead", async ({ senderId, receiverId }) => {
    console.log("-------------------------------------------------------");
    console.log("senderId: ", senderId);
    console.log("receiverId: ", receiverId);
    await chatMessage.updateMany(
      { senderId, receiverId, isRead: false },
      { $set: { isRead: true } }
    );
    // Có thể phát sự kiện thông báo lại cho sender tin nhắn đã đọc
    const receiverSocket = users[receiverId];
    if (receiverSocket) {
      io.to(receiverSocket).emit("receive-markAsRead", {
        senderId,
        receiverId,
      });
    }
  });

  // Xử lý khi client ngắt kết nối
  socket.on("disconnect", () => {
    for (const [userId, socketId] of Object.entries(users)) {
      if (socketId === socket.id) {
        delete users[userId];
        console.log(`User ${userId} disconnected and removed from users list.`);
        break;
      }
    }
    console.log("❌ User disconnected:", socket.id);
  });
};
