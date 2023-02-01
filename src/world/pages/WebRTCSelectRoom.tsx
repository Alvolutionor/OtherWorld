import WorldMenuFrame from "../components/WorldMenu/WorldMenuFrame";
import { EventAcrossComponents } from "../interface/WorldInterface";
import { Ref } from "react";
import WebRTCSelectRoomContent from "../components/Webrtc/WebRTCSelectRoomContent";
import Client_socket from "@/util/socket/Client_socket";

const WebRTCSelectRoom = ({
  GameEvent,
  rtc_socket,
}: {
  GameEvent: Ref<EventAcrossComponents | null>;
  rtc_socket: Client_socket;
}) => {
  return (
    <WorldMenuFrame key="WebRTCSelectRoomContent">
      <WebRTCSelectRoomContent GameEvent={GameEvent} rtc_socket={rtc_socket} />
    </WorldMenuFrame>
  );
};
export default WebRTCSelectRoom;

