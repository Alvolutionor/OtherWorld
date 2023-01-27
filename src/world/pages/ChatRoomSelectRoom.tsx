import WorldMenuFrame from "../components/WorldMenu/WorldMenuFrame";
import { EventAcrossComponents } from "../interface/WorldInterface";
import { Ref } from "react";
import ChatRoomSelectRoomContent from "../components/ChatRoom/ChatRoomSelectRoomContent";
import Client_socket from "@/util/socket/Client_socket";

const ChatRoomSelectRoom = ({
  GameEvent,
  client_socket,
}: {
  GameEvent: Ref<EventAcrossComponents | null>;
  client_socket: Client_socket;
}) => {
  return (
    <WorldMenuFrame key="ChatRoomLogIn">
      <ChatRoomSelectRoomContent GameEvent={GameEvent} client_socket={client_socket} />
    </WorldMenuFrame>
  );
};
export default ChatRoomSelectRoom;
