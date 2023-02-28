import { Center, Plane } from "@react-three/drei"
import { RockOne } from "../../objects/rocks/RockOne/RockOne"

export const Introduction = () => {
  return (
    <>
      <color attach={"background"} args={["#D0FEEF"]} />
      <ambientLight intensity={2} />
      <RockOne scale={0.5} position={[3, 0, 0]} />
      <Plane args={[30, 10, 4]} position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#E9AB4F" />
      </Plane>
      
    </>
  )
}
