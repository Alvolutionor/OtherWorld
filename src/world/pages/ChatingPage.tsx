import { Box, Input, Text, Button, Flex, IconButton, Image } from "@chakra-ui/react";
import { createRef, Ref, useState, useEffect } from "react";
import { EventAcrossComponents } from "@/world/interface/WorldInterface";
import Client_socket from "@/util/socket/Client_socket";
import WorldMenuFrame from "../components/WorldMenu/WorldMenuFrame";
import { v4 as uuidv4 } from "uuid";

const ChatingPage = ({
  GameEvent,
  client_socket,
}: {
  GameEvent: Ref<EventAcrossComponents | null>;
  client_socket: Client_socket;
}) => {
  const [msg, setMsg] = useState<Array<{ who: string; what: string }>>([
    { who: "System", what: "You have joined the chat room" },
  ]);
  const msgInputValue = createRef<HTMLInputElement>();
  useEffect(() => {
    client_socket.listenRoom(setMsg);
  }, []);
  const sendMessage = () => {
    setMsg((msg) => {
      msg.push({ who: "Me", what: msgInputValue.current?.value! });
      return msg;
    });
    client_socket.sendToRoom(msgInputValue.current?.value!);
    msgInputValue.current!.value = "";
  };
  return (
    <>
      <WorldMenuFrame
        opacity={0.85}
        color={"#191919"}
        key="ChatRoomLogIn"
        outerBorder={{ base: "5px", lg: "2px" }}
      >
        <Box w={"95%"} h={"95%"} ml={"2.5%"} mt={"2.5%"} padding-top={"30px"}>
          <Box overflow={"scroll"} backgroundColor={"rgba(0,0,0,0)"} h={"90%"}>
            {client_socket.listening ? (
              msg.map(({ who, what }, index) => {
                return (
                  <Text key={index} color={"rgba(255,255,255,1)"}>
                    {who}:{what}
                  </Text>
                );
              })
            ) : (
              <></>
            )}
          </Box>

          <Flex mb={"0"} h={"10%"}>
            <Input
              ref={msgInputValue}
              _active={{ borderColor: "#666666" }}
              _focus={{ borderColor: "#666666" }}
              _hover={{ borderColor: "#666666" }}
              margin={"0px"}
              w={{ base: "70%", lg: "80%" }}
              h={"100%"}
              borderColor={"#666666"}
              borderRadius={{ base: "0", lg: "0" }}
              color={"white"}
              placeholder=""
              _placeholder={{
                base: {
                  textAlign: "center",
                  opacity: 0.5,
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "400",
                },
                lg: {
                  textAlign: "center",
                  opacity: 0.5,
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "400",
                },
              }}
              style={{ borderWidth: "2px", outline: "none", boxShadow: "none" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <Button
              mt={"0"}
              backgroundColor={"#666666"}
              w={{ base: "30%", lg: "20%" }}
              h={"100%"}
              borderRadius={{ base: "0", lg: "0" }}
              onClick={sendMessage}
            >
              <Text fontSize={{ base: "20px", lg: "24px" }}>Send</Text>
            </Button>
          </Flex>
        </Box>
      </WorldMenuFrame>
      {/* TODO:zIndex setting to macro */}
      <IconButton
        pos={"fixed"}
        h={"40px"}
        w={"40px"}
        zIndex={"501"}
        onClick={() => {
          (GameEvent as any).current = { EventName: "gameInterface" };
        }}
        // onKeyDown
        _hover={{ cursor: "pointer" }}
        backgroundColor={"#808080"}
        aria-label="Close Menu"
        top={"10%"}
        mt={"-40px"}
        right={{ base: "0%", lg: "25%" }}
        opacity={0.8}
        icon={<Image src="assets/menu_close.png" boxSize="30px" />}
      />
      <IconButton
        h={"40px"}
        w={"40px"}
        zIndex={"501"}
        onClick={() => {
          (GameEvent as any).current = { EventName: "ChatRoomSelectRoom" };
        }}
        _hover={{ cursor: "pointer" }}
        backgroundColor={"#808080"}
        aria-label="Close Menu"
        pos={"fixed"}
        top={"10%"}
        mt={"-40px"}
        mr={"40px"}
        right={{ base: "0%", lg: "25%" }}
        opacity={0.8}
        icon={<Image src="assets/menu_go_back.png" boxSize="30px" />}
      />
    </>
  );
};
export default ChatingPage;
