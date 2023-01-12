import WorldMenu from "../components/WorldMenu"
import {EventAcrossComponents} from "../interface/WorldInterface"

const WorldReact = ({GameEvent,setReactEvent}:{GameEvent:EventAcrossComponents, setReactEvent:Function})=>{
  console.log(GameEvent)
  return(
  <div>
   {GameEvent.EventName == "clickOnComputer"?(<WorldMenu  GameEvent = {GameEvent} setReactEvent = {setReactEvent}/>):(<></>)}
  </div>
  )
}
export default WorldReact