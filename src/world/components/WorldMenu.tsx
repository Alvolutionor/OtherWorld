import {useEffect} from 'react'
// GameEvent is passed to Create react components
import {EventAcrossComponents} from "@/world/interface/WorldInterface"
import styled from "styled-components";
import { Box } from '@chakra-ui/react'

export const  MenuContainer = styled.div`
  position:fixed;
  width: 50%;
  left:25%;
  top: 10%;
  height: 80%;
  z-index: 999;
  background:white;
  opacity:1;
`;


const WorldMenu = ({GameEvent,setReactEvent}:{GameEvent:EventAcrossComponents, setReactEvent:Function})=>{

  return (
    <MenuContainer id = "Menu">
      <Box w = {'100%'} h = {'100%'}>

      </Box>
    </MenuContainer>
  
  )
}
export default WorldMenu