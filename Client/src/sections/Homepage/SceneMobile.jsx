import { useEffect, useState } from 'react';
import { SpaceshipMobile } from './SpaceshipMobile';
import { DeviceOrientationControls, Html, PerspectiveCamera } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import Countdown from './Countdown';
import MobileLinks from './MobileLinks';

export default function SceneMobile({ navIndex, keyframes, isVR }) {
  const [camPos, setCamPos] = useState([0,0,50]);
  const [camFov, setCamFov] = useState(50);
  const [camRot, setCamRot] = useState([0,0,0]);
  const camSpeed = 3;

  useFrame((s, d) => {
    if (navIndex != -2) {
      let targetPos = [0,0,0]
      let targetRot = [0,0,0]
      let speed = 1;

      if (navIndex >= 0) {
        targetPos = keyframes[navIndex].positionMob
        targetRot = keyframes[navIndex].rotationMob
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

  const adjustOrientation = (e) => {
    // setNorthOffsetLive(e.alpha);
  }

  useEffect(() => {
    adjustFOV()
    window.addEventListener("resize", adjustFOV)
    window.addEventListener("deviceorientation", adjustOrientation)
    return () => {
      window.removeEventListener("resize", adjustFOV)
      window.removeEventListener("deviceorientation", adjustOrientation)
    }
  }, [])

  return (
    <>
        {isVR ? 
          <>
            <DeviceOrientationControls/>
            <PerspectiveCamera
              fov={100}
              makeDefault
              position={[0,0,-13]}
              />
          </>

          :

          <PerspectiveCamera
          fov={100}
          makeDefault
          position={camPos}
          rotation={camRot}
          />
        }

        <SpaceshipMobile isVR={isVR}/>
        <ambientLight color="#ffffff" intensity={8}></ambientLight>
        <Countdown
          size={0.7}
          position={isVR ? [0,-1.2,0] : [0,-3.5,-12.5]}
          rotation={isVR ? [0, Math.PI, 0] : [0,0,0]}
          isVR={isVR}
          color="#0ff" />
          {
            isVR && 
            <MobileLinks
              keyframes={keyframes}
            />
          }

    </>

  )
}
