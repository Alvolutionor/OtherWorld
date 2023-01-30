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
  room?: { socketToRoom: socketToRoom; listening: boolean };
  socketLoginMessage?: socketLoginMessage;
  listening = false;
  constructor(ip: string) {
    this.socket = io(ip,
       //{secure: true}
       );
    this.socket.on("Connected", () => {
      console.log("Socket connected");
    });
  }
  login(socketLoginMessage: socketLoginMessage) {
    this.socket.emit("login", socketLoginMessage);
    var logInRes;
    logInRes = this.socket.on("loginSucceed", () => {
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
    this.room = { socketToRoom, listening: false };
    var logInRes;
    logInRes = this.socket.on("toRoomSucceed", () => {
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
    if (this.listening) {
      return;
    }
    this.socket.on("NewUser", (name) => {
      setMessage((message: any) => {
        console;
        name
          ? message.push({ who: "System", what: name + "has joined" })
          : message.push({ who: "System", what: "Anonymous has joined" });
        return message;
      });
    });
    this.socket.on("UserMessage", (msg) => {
      setMessage((message: Array<{ who: string; what: string }>) => {
        message.push(msg);
        return message;
      });
    });
    this.socket.on("SystemMessage", (msg) => {
      setMessage((message: Array<{ who: string; what: string }>) => {
        message.push({ who: "System", what: msg });
        return message;
      });
    });
    this.listening = true;
  }
  leaveRoom(socketToRoom: socketToRoom) {
    this.socket.emit("leaveRoom", socketToRoom);
    this.socket.off("NewUser");
    this.socket.off("UserMessage");
    this.socket.off("SystemMessage");
    this.listening = false;
  }
  sendToRoom(msg: string) {
    console.log(this.room);
    this.socket.emit("sendMsg", {
      who: this.socketLoginMessage?.name,
      what: msg,
      roomId: this.room?.socketToRoom.roomId,
    });
  }

  sendRTCCandidate(msg:string){
    this.socket.emit("__RTCCandidate",msg)
  }
  receiveRTCCandidate(handler: Function){
    this.socket.on("__RTCCandidate",(msg)=>handler(msg))
  }
  sendRTCOffer(sdp:string){
    this.socket.emit("__RTCOffer",sdp)
  }
  receiveRTCOffer(handler: Function){
    this.socket.on("__RTCOffer",(sdp)=>handler(sdp))
  }
  sendRTCAnswer(sdp:string){
    this.socket.emit("__RTCAnswer",sdp)
  }
  receiveRTCAnswer(handler: Function){
    this.socket.on("__RTCAnswer",(sdp)=>handler(sdp))
  }

}
