import WorldMenu from "../pages/WorldMenu";

import ChatRoomLogIn from "../pages/ChatRoomLogIn";
import ChatRoomSelectRoom from "../pages/ChatRoomSelectRoom";
import ChatingPage from "../pages/ChatingPage";

import RemoteControll from "../pages/RemoteControll";

import WebRTCLogIn from "../pages/WebRTCLogIn";
import WebRTCSelectRoom from "../pages/WebRTCSelectRoom";
import WebRTC from "../pages/WebRTC";

import Client_socket from "@/util/socket/Client_socket";
import { EventAcrossComponents } from "../interface/WorldInterface";
import { Ref, useEffect } from "react";
const WorldReact = ({
  GameEvent,
  client_socket,
}: {
  GameEvent: Ref<EventAcrossComponents | null>;
  client_socket: Client_socket;
}) => {
  useEffect(() => {}, [(GameEvent as any)?.current]);
  // console.log(GameEvent);
  let RenderAccordingly;
  if ((GameEvent as any)?.current?.EventName == "WorldMenu") {
    RenderAccordingly = <WorldMenu GameEvent={GameEvent} />;
  }
  if ((GameEvent as any)?.current?.EventName == "gameInterface") {
    RenderAccordingly = <></>;
  }
  //need reorganize
  if ((GameEvent as any)?.current?.EventName == "ChatRoomLogIn") {
    RenderAccordingly = <ChatRoomLogIn GameEvent={GameEvent} client_socket={client_socket} />;
  }
  if ((GameEvent as any)?.current?.EventName == "ChatRoomSelectRoom") {
    RenderAccordingly = <ChatRoomSelectRoom GameEvent={GameEvent} client_socket={client_socket} />;
  }
  if ((GameEvent as any)?.current?.EventName == "Chating") {
    RenderAccordingly = <ChatingPage GameEvent={GameEvent} client_socket={client_socket} />;
  }

  if ((GameEvent as any)?.current?.EventName == "RemoteControll") {
    RenderAccordingly = <RemoteControll GameEvent={GameEvent} />;
  }
  if ((GameEvent as any)?.current?.EventName == "WebRTCLogIn") {
    RenderAccordingly = <WebRTCLogIn GameEvent={GameEvent} rtc_socket={client_socket} />;
  }
  if ((GameEvent as any)?.current?.EventName == "WebRTCSelectRoom") {
    RenderAccordingly = <WebRTCSelectRoom GameEvent={GameEvent} rtc_socket={client_socket} />;
  }
  if ((GameEvent as any)?.current?.EventName == "WebRTC") {
    RenderAccordingly = <WebRTC GameEvent={GameEvent} rtc_socket={client_socket}/>;
  }

  return <div>{RenderAccordingly}</div>;
};
export default WorldReact;
