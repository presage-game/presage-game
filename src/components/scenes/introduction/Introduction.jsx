import { Center, Environment, PerspectiveCamera, Plane } from "@react-three/drei"
import { SceneOne } from "../../objects/scenes/SceneOne"

export const Introduction = () => {
  //tester plane post processing
  return (
    <>
      <PerspectiveCamera makeDefault position={[20, 3, 0]} rotation={[0, Math.PI / 2, 0]} />
      <color attach={"background"} args={["#D0FEEF"]} />
      <ambientLight intensity={2} />
      <SceneOne />
    </>
  )
}
