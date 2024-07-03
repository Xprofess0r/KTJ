import { useEffect, useState } from 'react';
import { SpaceshipPC } from './SpaceshipPC';
import { Html, PerspectiveCamera , Text} from "@react-three/drei"
import { useFrame, extend } from "@react-three/fiber"
import Countdown from './Countdown';
import { useNavigate } from "react-router-dom";

export default function Scene({ navIndex, keyframes }) {
  const [camPos, setCamPos] = useState([0,0,50]);
  const [camFov, setCamFov] = useState(50);
  const [camRot, setCamRot] = useState([0,0,0]);
  const camSpeed = 1.5

  const navigate = useNavigate();

  useFrame((s, d) => {
    if (navIndex != -2) {
      let targetPos = [0,0,0]
      let targetRot = [0,0,0]
      let speed = 1

      if (navIndex >= 0) {
        targetPos = keyframes[navIndex].position
        targetRot = keyframes[navIndex].rotation
        speed = camSpeed
      }

      setCamPos((oldPos) => {
        let newPos = [0,0,0]

        newPos[0] = oldPos[0] + (targetPos[0] - oldPos[0]) * d * speed
        newPos[1] = oldPos[1] + (targetPos[1] - oldPos[1]) * d * speed
        newPos[2] = oldPos[2] + (targetPos[2] - oldPos[2]) * d * speed

        return newPos
      })

      setCamRot((oldRot) => {
        let newRot = [0,0,0]
        
        newRot[0] = oldRot[0] + (targetRot[0] - oldRot[0]) * d * speed
        newRot[1] = oldRot[1] + (targetRot[1] - oldRot[1]) * d * speed
        newRot[2] = oldRot[2] + (targetRot[2] - oldRot[2]) * d * speed

        return newRot
      })

    }
  })

  const adjustFOV = () => {
    setCamFov(100 - 50 * ((window.innerWidth - 360) / (1440 - 360)))
  }

  useEffect(() => {
    adjustFOV()
    window.addEventListener("resize", adjustFOV)
    return () => {
      window.removeEventListener("resize", adjustFOV)
    }
  })

  return (
    <>
        <ambientLight color="#ffffff" intensity={8}></ambientLight>
        <PerspectiveCamera fov={camFov} makeDefault position={camPos} rotation={camRot}/>
        <SpaceshipPC/>
        <Countdown
          size={0.7}
          position={[0,-1.2,-17.5]}
          rotation={[0,0,0]}
          color="#0ff" />
    </>

  )
}
