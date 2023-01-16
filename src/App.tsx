import Client_socket from "./socket/Client_socket";
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
  client_socket = new Client_socket("127.0.0.1:37788");
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
