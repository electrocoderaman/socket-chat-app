import http from "node:http";
import { Server } from "socket.io";

async function main() {
  const server = http.createServer();

  const io = Server();

  io.attach(server);

  server.listen(9000,() => { 
    console.log("server is running on port 9000")
   })
}
