import { useRef, useState } from 'react'
import './App.css'
import nipplejs from 'nipplejs';
import { Joystick } from 'react-joystick-component';
import ReactNipple from 'react-nipple';
 import 'react-nipple/lib/styles.css';

function App() {

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const pc = useRef<RTCPeerConnection>()
  var manager = nipplejs.create(options);
  const getMediaDevices = ()=>{
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(stream =>{localVideoRef.current!.srcObject = stream})
  }
  const createRtcConnection = ()=>{
    const _pc = new RTCPeerConnection({
      iceServers:[
        {urls:["stun:stun.proctocol.org:3478"]}
      ]
    })
    pc.current = _pc

  }
  const createOffer = ()=>{
    pc.current?.createOffer({
      offerToReceiveVideo:true,
      offerToReceiveAudio: true
    })
    .then(sdp =>{
      pc.current?.setLocalDescription(sdp)
    })
  }
  const [things, setThings] = useState<any[]>([])
  const contentlog = (...args:any)=>{console.log(args)}
  return (
    <div>
      {/* <button onClick = {getMediaDevices}> get media</button>
      <video style = {{width:"400px"}} ref = {localVideoRef} autoPlay></video>
      <button onClick = {createRtcConnection}> create offer</button> */}

      <canvas width='100%' height = "100px"></canvas >
      <button onClick={()=>{contentlog(window, navigator)}}>mmmm</button>
      <Joystick size={100} sticky={false} baseColor="red" stickColor="blue" move={e=>{console.log(e)}} stop={e=>{console.log(e)}}></Joystick>
    </div>
  )

}

export default App
