import { Text} from "@react-three/drei"
import { useNavigate } from "react-router-dom";
import STMFont from "../../assets/ShareTechMono-Regular.ttf"

export default function MobileLinks({keyframes}) {
    const navigate = useNavigate();
  return (
    <>
    {
        keyframes.map((k,i) => {
            return (
                i != 1 &&
                <mesh position={k.vrLocation.pos} rotation={k.vrLocation.rot} key={i} onClick={() => { navigate(k.linkRoute) }}>
                    <boxGeometry args={[18,24,1]}/>
                    <meshBasicMaterial transparent={true} opacity={0}/>
                </mesh>
            )
        })
    }

        <Text onClick={() => { navigate("/workshop") }}
          scale={[0.6, 0.7, 0.65]}
          position={[-7,-2.5,-18]}
          rotation={[0,1.1,0]}
          color={"black"}
          anchorX="center"
          anchorY="middle"
          outlineColor={"#0ff"}
          outlineWidth={0.1}
          outlineOpacity={1}
          font={STMFont}>{"WORKSHOPS >>"}</Text>

        <Text onClick={() => { navigate("/gamefest") }}
          scale={[0.6, 0.7, 0.65]}
          position={[-7,-3.75,-18]}
          rotation={[0,1.1,0]}
          color={"black"}
          anchorX="center"
          anchorY="middle"
          outlineColor={"#0ff"}
          outlineWidth={0.1}
          outlineOpacity={1}
          font={STMFont}>{"GAMEFEST >>"}</Text>
    </>
  )
}
