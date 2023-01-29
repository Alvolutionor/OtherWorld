import WorldMenuFrame from "../components/WorldMenu/WorldMenuFrame";
import { EventAcrossComponents } from "../interface/WorldInterface";
import { Ref } from "react";
import WebRTCLogInContent from "../components/Webrtc/WebRTCLogInContent";
import Client_socket from "@/util/socket/Client_socket";

const WebRTCLogIn = ({
  GameEvent,
  rtc_socket,
}: {
  GameEvent: Ref<EventAcrossComponents | null>;
  rtc_socket: Client_socket;
}) => {
  return (
    <WorldMenuFrame key="WebRTCLogInContent">
      <WebRTCLogInContent GameEvent={GameEvent} rtc_socket={rtc_socket} />
    </WorldMenuFrame>
  );
};
export default WebRTCLogIn;
