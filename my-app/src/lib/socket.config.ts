import { io, Socket } from "socket.io-client";
import Env from "./env";
let socket: Socket;
export const getSocket = () => {
  if (!socket) {
    // Socket.io server is at the root URL, not the API path
    const socketUrl = Env.BACKEND_URL.replace('/api/chatroom/v1', '');
    socket = io(socketUrl, { autoConnect: false });
  }
  return socket;
};