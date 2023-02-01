import WorldMenuFrame from "../components/WorldMenu/WorldMenuFrame";
import { EventAcrossComponents } from "../interface/WorldInterface";
import { Ref } from "react";
import ChatRoomLogInContent from "../components/ChatRoom/ChatRoomLogInContent";
import Client_socket from "@/util/socket/Client_socket";

const ChatRoomLogIn = ({
  GameEvent,
  client_socket,
}: {
  GameEvent: Ref<EventAcrossComponents | null>;
  client_socket: Client_socket;
}) => {
  return (
    <WorldMenuFrame key="ChatRoomLogIn">
      <ChatRoomLogInContent GameEvent={GameEvent} client_socket={client_socket} />
    </WorldMenuFrame>
  );
};
export default ChatRoomLogIn;
