import { io } from "socket.io-client";
import { Socket } from "socket.io-client";

export interface socketLoginMessage {
  type: string; // logged in or annouymous
  userId?: string;
  password?: string;
  name: string; // check by server?
}
export interface socketToRoom {
  type: string;
  roomId: string;
}
export default class Client_socket {
  //TODO: Change socket to array of sockets
  socket: Socket;
  rooms?: Array<{ socketToRoom: socketToRoom; listening: boolean }>;
  socketLoginMessage?: socketLoginMessage;
  listening = false;
  constructor(ip: string) {
    this.socket = io(ip);
    this.socket.on("Connected", () => {
      console.log("Socket connected");
    });
  }
  login(socketLoginMessage: socketLoginMessage) {
    this.socket.emit("login", socketLoginMessage);
    var logInRes;
    logInRes = this.socket.on("loginSucceed", () => {
      this.rooms = [];
      this.socketLoginMessage = socketLoginMessage;
      return "success";
    });
    logInRes = this.socket.on("loginFailed", () => {
      return "failed";
    });
    this.socket.off("loginSucceed");
    this.socket.off("loginFailed");
    return logInRes;
  }
  //toRoom then render chat room then listen
  toRoom(socketToRoom: socketToRoom) {
    this.socket.emit("toRoom", socketToRoom);
    var logInRes;
    logInRes = this.socket.on("toRoomSucceed", () => {
      this.rooms?.push({ socketToRoom, listening: false });
      return "success";
    });
    logInRes = this.socket.on("toRoomFailed", () => {
      return "failed";
    });
    this.socket.off("toRoomSucceed");
    this.socket.off("toRoomFailed");
    return logInRes;
  }
  //message store:
  // [{who:what}]
  //
  async listenRoom(setMessage: Function) {
    this.listening = true;

    if (this.listening) {
      return;
    }
    await this.socket.on("NewUser", (name) => {
      setMessage((message: any) => {
        console.log(message);
        message = message.push({ who: "system", what: name + "has joined" });
        return message;
      });
    });
    this.socket.on("UserMessage", (name, msg) => {
      setMessage((message: Array<{ who: string; what: string }>) =>
        message.push({ who: name, what: msg })
      );
    });
    this.socket.on("SystemMessage", (msg) => {
      setMessage((message: Array<{ who: string; what: string }>) =>
        message.push({ who: "system", what: msg })
      );
    });
  }
  leaveRoom(socketToRoom: socketToRoom) {
    this.socket.emit("leaveRoom", socketToRoom);
    this.socket.off("NewUser");
    this.socket.off("UserMessage");
    this.socket.off("SystemMessage");
    this.listening = false;
  }
  sendToRoom(msg: string, socketToRoom: socketToRoom) {
    this.socket.emit("sendMsg", {
      who: this.socketLoginMessage?.name,
      what: msg,
      room: socketToRoom.roomId,
    });
  }
}
