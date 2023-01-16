import { Ref } from "react";
// GameEvent is passed to Create react components
import { EventAcrossComponents } from "@/world/interface/WorldInterface";
import WorldMenuFrame from "../components/WorldMenu/WorldMenuFrame";
import WorldMenuContent from "../components/WorldMenu/WorldMenuContent";
const WorldMenu = ({ GameEvent }: { GameEvent: Ref<EventAcrossComponents | null> }) => {
  return (
    <WorldMenuFrame key="MainWorldMenu">
      <WorldMenuContent GameEvent={GameEvent} />
    </WorldMenuFrame>
  );
};
export default WorldMenu;
