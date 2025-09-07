import { Server, Socket } from "socket.io";
import prisma from './config/db.config.js';
// define custom socket type
interface CustomSocket extends Socket {
  room?: string;
}

export function setupSocket(io: Server) {
  io.use((socket: CustomSocket, next) => {
    const room = socket.handshake.auth.room;

    if (!room) {
      return next(new Error("No room provided"));
    }

    socket.room = room;   
    socket.join(room);    
    next();
  });

  io.on("connection", async(socket: CustomSocket) => {
    console.log("connected to ws", socket.id, "room:", socket.room);
    socket.on("disconnect", () => {
      console.log("connection disconnected", socket.id);
    });

    socket.on("message",async (data) => {
      console.log("new message", data);
       await prisma.chat.create({
  data:data,
})
      
      if (socket.room) {
        socket.to(socket.room).emit("message", data);
      }
    });
  });
}
