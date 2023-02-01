import { Box, Text, Image } from "@chakra-ui/react";
import { IconButton, Button } from "@chakra-ui/react";
import { EventAcrossComponents } from "@/world/interface/WorldInterface";
import { Ref } from "react";
const WorldMenuContent = ({ GameEvent }: { GameEvent: Ref<EventAcrossComponents | null> }) => {
  return (
    <>
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
          fontSize={{ base: "48px", lg: "36px" }}
          textAlign={"center"}
        >
          MENU
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

      <Box
        id="ChatRoom"
        ml={"10%"}
        w={"80%"}
        borderRadius={{ base: "15px", lg: "30px" }}
        mt={{ base: "5%", lg: "5%" }}
        h={{ base: "20", lg: "15%" }}
        backgroundColor={"#666666"}
      >
        <Button
          backgroundColor={"#666666"}
          w={"100%"}
          h={"100%"}
          borderRadius={{ base: "15px", lg: "30px" }}
          onClick={() => {
            (GameEvent as any).current = { EventName: "ChatRoomLogIn" };
          }}
        >
          <Text fontSize={{ base: "20px", lg: "24px" }}> CHATROOM</Text>
        </Button>
      </Box>
      <Box
        id="RemoteControll"
        ml={"10%"}
        borderRadius={{ base: "15px", lg: "30px" }}
        w={"80%"}
        mt={{ base: "5%", lg: "5%" }}
        h={{ base: "20", lg: "15%" }}
        backgroundColor={"#666666"}
      >
        <Button
          backgroundColor={"#666666"}
          w={"100%"}
          h={"100%"}
          borderRadius={{ base: "15px", lg: "30px" }}
          onClick={() => {
            (GameEvent as any).current = { EventName: "RemoteControll" };
          }}
        >
          <Text fontSize={{ base: "20px", lg: "24px" }}>REMOTECONTROLL</Text>
        </Button>
      </Box>
      <Box
        id="WebRtc"
        ml={"10%"}
        borderRadius={{ base: "15px", lg: "30px" }}
        w={"80%"}
        mt={{ base: "5%", lg: "5%" }}
        h={{ base: "20", lg: "15%" }}
        backgroundColor={"#666666"}
      >
        <Button
          backgroundColor={"#666666"}
          w={"100%"}
          h={"100%"}
          borderRadius={{ base: "15px", lg: "30px" }}
          onClick={() => {
            (GameEvent as any).current = { EventName: "WebRTCLogIn" };
          }}
        >
          <Text fontSize={{ base: "20px", lg: "24px" }}>WEBRTC</Text>
        </Button>
      </Box>
    </>
  );
};
export default WorldMenuContent;
