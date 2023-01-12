import { io } from "socket.io-client";

const socket = io("127.0.0.1:37788");
console.log("sa");
export module socket_handler {
  export const test = () => {
    socket.on("hello", (arg) => {
      console.log(arg);
    });
  };
}
