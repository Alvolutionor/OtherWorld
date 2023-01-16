import { Box, Text, Image, Input } from "@chakra-ui/react";
import { IconButton, Button } from "@chakra-ui/react";
import { EventAcrossComponents } from "@/world/interface/WorldInterface";
import { Ref, useState } from "react";
import { fontFamily, fontSize } from "@mui/system";
import Client_socket from "@/socket/Client_socket";

const ChatRoomSelectRoomContent = ({
  GameEvent,
  client_socket,
}: {
  GameEvent: Ref<EventAcrossComponents | null>;
  client_socket: Client_socket;
}) => {
  const [roomId, setRoomId] = useState<string>("");
  return (
    <Box>
      <Box
        id="head"
        pos={"relative"}
        pt={"2.5%"}
        h={"15%"}
        mt={{ base: "5%", lg: "5%" }}
        mb={{ base: "15%", lg: "5%" }}
      >
        <Text
          _hover={{ cursor: "default" }}
          width={"100%"}
          opacity={1}
          color={"white"}
          fontWeight={"800"}
          fontSize={{ base: "24px", lg: "36px" }}
          textAlign={"center"}
        >
          Chat Room
        </Text>
      </Box>
      <IconButton
        onClick={() => {
          (GameEvent as any).current = { EventName: "gameInterface" };
        }}
        _hover={{ cursor: "pointer" }}
        backgroundColor={"#808080"}
        aria-label="Close Menu"
        pos={"absolute"}
        top={"5%"}
        right={"5%"}
        opacity={0.8}
        icon={<Image src="assets/menu_close.png" boxSize="30px" />}
      />
      <IconButton
        onClick={() => {
          (GameEvent as any).current = { EventName: "ChatRoomLogIn" };
        }}
        _hover={{ cursor: "pointer" }}
        backgroundColor={"#808080"}
        aria-label="Close Menu"
        pos={"absolute"}
        top={"5%"}
        left={"5%"}
        opacity={0.8}
        icon={<Image src="assets/menu_go_back.png" boxSize="30px" />}
      />
      <Text
        _hover={{ cursor: "default" }}
        width={"100%"}
        opacity={1}
        color={"white"}
        fontWeight={"800"}
        fontSize={{ base: "36px", lg: "24px" }}
        ml={{ base: "0", lg: "10%" }}
        mt={{ base: "0%", lg: "10%" }}
        textAlign={{ base: "center", lg: "left" }}
      >
        RoomID
      </Text>
      <Input
        onChange={(event) => {
          setRoomId(event.target.value);
        }}
        _active={{ borderColor: "White" }}
        _focus={{ borderColor: "White" }}
        mt={"5%"}
        ml={"10%"}
        w={"80%"}
        h={"60px"}
        placeholder="Enter Room ID"
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
      />
      <Box
        id="next"
        w={{ base: "80%", lg: "" }}
        borderRadius={{ base: "15px", lg: "30px" }}
        ml={{ base: "10%" }}
        mt={{ base: "10%", lg: "5%" }}
        h={{ base: "45px", lg: "60px" }}
        backgroundColor={"#666666"}
      >
        <Button
          backgroundColor={"#666666"}
          w={"100%"}
          h={"100%"}
          borderRadius={{ base: ".375rem", lg: "0.375rem" }}
          onClick={() => {
            (GameEvent as any).current = { EventName: "Chating" };
            console.log("roomId" + roomId);
            client_socket.toRoom({ type: "ChatRoom", roomId: roomId });
          }}
        >
          <Text fontSize={{ base: "20px", lg: "24px" }}>Enter</Text>
        </Button>
      </Box>
    </Box>
  );
};
export default ChatRoomSelectRoomContent;
