import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

const WorldMenuFrame = ({
  children,
  opacity = 0.8,
  color = "#808080",
  outerBorder = { base: "20px", lg: "25px" },
}: any) => {
  let hFixed;
  let wFixed;
  useEffect(() => {
    hFixed = window.innerHeight;
    wFixed = window.innerWidth;
  }, []);
  return (
    <Box
      pos={"fixed"}
      w={{ base: "100%", lg: "50%" }}
      h={"80%"}
      left={{ base: "0", lg: "25%" }}
      top={"10%"}
      zIndex={"500"}
      backgroundColor={color}
      opacity={opacity}
      borderRadius={outerBorder}
      id="Menu"
      overflow={"scroll"}
    >
      {children}
    </Box>
  );
};
export default WorldMenuFrame;
