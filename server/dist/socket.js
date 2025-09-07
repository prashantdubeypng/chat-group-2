import { Server, Socket } from "socket.io";
import prisma from './config/db.config.js';
export function setupSocket(io) {
    io.use((socket, next) => {
        const room = socket.handshake.auth.room;
        if (!room) {
            return next(new Error("No room provided"));
        }
        socket.room = room;
        socket.join(room);
        next();
    });
    io.on("connection", async (socket) => {
        console.log("connected to ws", socket.id, "room:", socket.room);
        socket.on("disconnect", () => {
            console.log("connection disconnected", socket.id);
        });
        socket.on("message", async (data) => {
            console.log("new message", data);
            await prisma.chat.create({
                data: data,
            });
            if (socket.room) {
                socket.to(socket.room).emit("message", data);
            }
        });
    });
}
//# sourceMappingURL=socket.js.map