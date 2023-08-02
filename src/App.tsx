import Client_socket from "./util/socket/Client_socket";
import InitWorld from "./world/world";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import Fonts from "./styles/font";

const theme = extendTheme({
  fonts: {
    Pixel: "Pixel",
  },
});

let client_socket: any;
function App() {
  client_socket = new Client_socket(import.meta.env.VITE_SOCKET_IP as string);

  console.log(client_socket)
  return (
    <Box>
      <ChakraProvider theme={theme}>
        <Fonts />
        <InitWorld parentName="phaser_container" client_socket={client_socket} />
      </ChakraProvider>
    </Box>
  );
}
export { client_socket };
export default App;
