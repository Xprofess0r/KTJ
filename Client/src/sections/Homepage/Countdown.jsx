import React, { useEffect, useState } from 'react'
import STMFont from "../../assets/ShareTechMono-Regular.ttf"
import { Text } from "@react-three/drei";

export default function Countdown({position, color, size, rotation}) {

    const [countdownText, setCountdownText] = useState("19-21 January")

    const ktjDate = new Date("2024-01-19")
    const handleTimeUpdate = () => {
        let today = new Date()
        let timeLeft = ktjDate - today;

        if (timeLeft > 0) {
            let daysLeft = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
            timeLeft = timeLeft % (24 * 60 * 60 * 1000)

            let hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000));
            timeLeft = timeLeft % (60 * 60 * 1000)

            let minLeft = Math.floor(timeLeft / (60 * 1000));
            timeLeft = timeLeft % (60 * 1000)

            let secLeft = Math.floor(timeLeft / (1000));

            setCountdownText(`${daysLeft}d ${hoursLeft}h ${minLeft}m ${secLeft}s to go`)
        }
        else {
            setCountdownText(`LIVE NOW`)
        }

    }
    useEffect(() => {
        const updateInterval = setInterval(handleTimeUpdate, 1000);

        return () => {
            clearInterval(updateInterval)
        }
    }, [])

  return (

    <>
        <Text
          scale={[size,size,1]}
          position={position}
          rotation={rotation}
          color={color}
          anchorX="center"
          anchorY="middle"
          outlineColor={color}
          outlineWidth={0.01}
          outlineOpacity={0.25}
          font={STMFont}>{countdownText}</Text>
          <Text
          scale={[size,size,1]}
          position={position}
          rotation={rotation}
          color={color}
          anchorX="center"
          anchorY="middle"
          outlineColor={color}
          outlineWidth={0.06}
          outlineOpacity={0.2}
          font={STMFont}>{countdownText}</Text>
          <Text
          scale={[size,size,1]}
          position={position}
          rotation={rotation}
          color={color}
          anchorX="center"
          anchorY="middle"
          outlineColor={color}
          outlineWidth={0.12}
          outlineOpacity={0.1}
          font={STMFont}>{countdownText}</Text>
          <Text
          scale={[size,size,1]}
          rotation={rotation}
          position={position}
          color={color}
          anchorX="center"
          anchorY="middle"
          outlineColor={color}
          outlineWidth={0.25}
          outlineOpacity={0.05}
          font={STMFont}>{countdownText}</Text>
    </>
  )
}
