import Phaser from 'phaser'
import {useState, useEffect} from 'react'
import InitScene from './scene/scene'
import WorldReact from "./react/WorldReact"
import {EventAcrossComponents} from "./interface/WorldInterface"

const InitWorld = ({parentName}:{parentName:string})=>{
	const [GameEvent, setGameEvent] = useState<EventAcrossComponents>({})
	const [reactEvent,setReactEvent] = useState<EventAcrossComponents>({})
	useEffect(()=>{
		const config = {
			type: Phaser.AUTO,
			parent: parentName,  
			transparent: true,
			scale: {
        mode: Phaser.Scale.RESIZE,
        width: '100%',
        height: '100%'
   	  },
			physics: {
				default: 'arcade',
				arcade: {
					gravity: { y: 200 },
				},
			},
			scene: [new InitScene({key:"zero"}, '001', setGameEvent, reactEvent)],
		}
		const game = new Phaser.Game(config);
		return () => {
      game.destroy(false);
    };
	},[])
	
	return(
		<div>
			<div id = {parentName} style = {{zIndex:100,}}></div>
			<WorldReact  GameEvent = {GameEvent} setReactEvent = {setReactEvent}/>
		</div>
	)
}
export default InitWorld