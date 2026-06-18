import http from "node:http";
import { Server } from "socket.io";
import express from "express";
import path from "node:path";

async function main() {
  const app = express();
  app.use(express.static(path.resolve("./public")));

  const server = http.createServer(app);

  const io = new Server();

  io.attach(server);
  io.on("connection", (socket) => {
    console.log(`A new socket has connected ${socket.id}`);

    socket.on("user:message", (data) => {
      console.log(`message from socket`, data);
      socket.broadcast.emit("server:message", data);
    });

    socket.on("user:typing", (data) => {
      socket.broadcast.emit("server:user:typing", { id: socket.id });
    });
  });

  server.listen(9000, () => {
    console.log("server is running on port 9000");
  });
}

main();
