import WorldMenuFrame from "../components/WorldMenu/WorldMenuFrame";
import { EventAcrossComponents } from "../interface/WorldInterface";
import { Ref } from "react";

const ChatRoomLogIn = ({ GameEvent }: { GameEvent: Ref<EventAcrossComponents | null> }) => {
  return <WorldMenuFrame key="ChatRoomLogIn"></WorldMenuFrame>;
};
export default ChatRoomLogIn;
