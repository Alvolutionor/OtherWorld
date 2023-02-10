import { EventAcrossComponents } from "../interface/WorldInterface";
import { Ref, useEffect, useRef, useState } from "react";
import Client_socket from "../../util/socket/Client_socket";
import WorldMenuFrame from "../components/WorldMenu/WorldMenuFrame";


const WebRTC = ({ GameEvent, rtc_socket,isVideoChatOrScreenShare}: 
  { GameEvent: Ref<EventAcrossComponents | null>, rtc_socket:Client_socket,isVideoChatOrScreenShare:number }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream>();
  const peerConnection = useRef<RTCPeerConnection>();

  const VIDEOCHAT = 1;
  const SCREENSHARE = 2;
  const [ICE, setIC] = useState<JSON>();
  const getMediaDevices = async (isVideoChatOrScreenShare: integer) => {
    const mobileCheck = () => {
      let check = false;
      (function (a) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
            a
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            a.substr(0, 4)
          )
        )
          check = true;
      })(navigator.userAgent);
      return check;
    };
    // another example
    //{ audio: true, video: { facingMode: { exact: "environment" } } }
    //{ audio: true, video: { facingMode: "user" } }
    //{
    //   audio: true,
    //   video: {
    //     width: { min: 1280 },
    //     height: { min: 720 }
    //   }
    // }
    //screenshare option example
    // const gdmOptions = {
    //   video: {
    //     displaySurface: "window"
    //   },
    //   audio: {
    //     echoCancellation: true,
    //     noiseSuppression: true,
    //     sampleRate: 44100
    //     suppressLocalAudioPlayback: true
    //   },
    //   surfaceSwitching: "include",
    //   selfBrowserSurface: "exclude",
    //   systemAudio: "exclude"
    // }
    let stream;
    if (isVideoChatOrScreenShare == SCREENSHARE) {
      stream = await navigator.mediaDevices.getDisplayMedia({ video:true, audio:true });
    } else {
      if (mobileCheck()) {
        console.log(navigator)
        stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: { facingMode: "user" },
        });
      } else {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      }
    }
    localVideoRef.current!.srcObject = stream;
    localStreamRef.current = stream;
  };
  const createRtcConnection = (client_socket: Client_socket) => {
    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: ["stun:stun.stunprotocol.org:3478"],
        },
      ],
    });
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        console.log("asdasda")
        client_socket.sendRTCCandidate(JSON.stringify(e.candidate));
      }
    };
    pc.ontrack = e => {
      remoteVideoRef.current!.srcObject = e.streams[0]
    }
    peerConnection.current = pc;
  };
  const createOffer = () => {
    peerConnection.current
      ?.createOffer({
        offerToReceiveVideo: true,
        offerToReceiveAudio: true,
      })
      .then((sdp) => {
        peerConnection.current?.setLocalDescription(sdp);
        console.log("sent")

        rtc_socket.sendRTCOffer(JSON.stringify(sdp));
      });
  };
  const createAnswer = () => {
    peerConnection.current
      ?.createAnswer({
        offerToReceiveVideo: true,
        offerToReceiveAudio: true,
      })
      .then((sdp) => {
        peerConnection.current?.setLocalDescription(sdp);
        rtc_socket.sendRTCAnswer(JSON.stringify(sdp));
      }); 
  };

  useEffect(() => {
    getMediaDevices(isVideoChatOrScreenShare).then(() => {
      createRtcConnection(rtc_socket);
      addLocalStreamToRtcConnection();
      rtc_socket.receiveRTCCandidate((msg: string) => {
        peerConnection.current?.addIceCandidate(new RTCIceCandidate(JSON.parse(msg)));
      });
      rtc_socket.receiveRTCOffer((msg: string) => {
        peerConnection.current?.setRemoteDescription(new RTCSessionDescription(JSON.parse(msg)))
      });
      rtc_socket.receiveRTCAnswer((msg: string) => {
        peerConnection.current?.setRemoteDescription(new RTCSessionDescription(JSON.parse(msg)))
      })
    
    });
  }, []);

  const addLocalStreamToRtcConnection = () => {
    const localStream = localStreamRef.current!;
    localStream.getTracks().forEach((track) => {
      peerConnection.current!.addTrack(track, localStream);
    });
    console.log("将本地视频流添加到 RTC 连接成功");
  };

  return (
    <WorldMenuFrame key="WebRTCSelectRoomContent">
      <div style = {{zIndex:501}}>
      <video style={{ width: '400px' }} ref={localVideoRef} autoPlay controls></video>
      <video style={{ width: '400px' }} ref={remoteVideoRef} autoPlay controls></video>
      <br />
      <br />
        <button onClick={createOffer}>拨号</button>
        <button onClick={createAnswer}>接听</button>
    </div>
  </WorldMenuFrame>
  );
};
export default WebRTC;
