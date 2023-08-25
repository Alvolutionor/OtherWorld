import Phaser from "phaser";
import { useRef, useEffect, useState } from "react";
import InitScene from "./scene/scene";
import WorldReact from "./eventManager/WorldManager";
import { EventAcrossComponents } from "./interface/WorldInterface";
import Client_socket from "@/util/socket/Client_socket";

const InitWorld = ({
  parentName,
  client_socket,
}: {
  parentName: string;
  client_socket: Client_socket;
}) => {
  const GameEvent = useRef<EventAcrossComponents | null>(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: parentName,
      transparent: true,
      scale: {
        mode: Phaser.Scale.FIT,
        width: "100%",
        height: "100%",
      },
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
        },
      },
      scene: [new InitScene({ key: "zero" }, "001", GameEvent)],
    };
    const game = new Phaser.Game(config);
    return () => {
      game.destroy(false);
    };
  }, []);

  const [, setForceUpdate] = useState(Date.now());
  useEffect(() => {
    setTimeout(() => {
      setForceUpdate((a) => a + 1);
    }, 100);
  });

  return (
    <div>
      <div id={parentName} style={{ zIndex: 100, padding: 0, border: 0, margin: 0 }}></div>
      <WorldReact GameEvent={GameEvent} client_socket={client_socket} />
    </div>
  );
};
export default InitWorld;
