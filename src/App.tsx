import { socket_handler } from "./connection/socket";
import InitWorld from "./world/world";
function App() {
  socket_handler.test();
  return <InitWorld parentName="phaser_container" />;
}

export default App;
