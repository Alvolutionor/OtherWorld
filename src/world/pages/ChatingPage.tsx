import { Box, Input, Text } from "@chakra-ui/react";
import { Ref, useState } from "react";
import { EventAcrossComponents } from "@/world/interface/WorldInterface";
import Client_socket from "@/socket/Client_socket";
import WorldMenuFrame from "../components/WorldMenu/WorldMenuFrame";

const ChatingPage = ({
  GameEvent,
  client_socket,
}: {
  GameEvent: Ref<EventAcrossComponents | null>;
  client_socket: Client_socket;
}) => {
  const [msg, setMsg] = useState<Array<{ who: string; what: string }>>([]);

  client_socket.listenRoom(setMsg);
  console.log(msg);
  return (
    <WorldMenuFrame opacity={0.85} color={"#191919"} key="ChatRoomLogIn">
      <Box overflow={"scroll"} backgroundColor={"rgba(0,0,0,0)"}>
        {client_socket.listening ? (
          msg.map(({ who, what }) => {
            return (
              <Text color={"rgba(255,255,255,1)"}>
                {who}:{what}
              </Text>
            );
          })
        ) : (
          <></>
        )}
      </Box>
      <Input></Input>
    </WorldMenuFrame>
  );
};
export default ChatingPage;
