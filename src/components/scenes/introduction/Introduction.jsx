import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { SceneOne } from "../../objects/scenes/SceneOne"
import { HotGround } from "../../effects/HotGround"

export const Introduction = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[20, 3, 0]} rotation={[0, Math.PI / 2, 0]} />
      <color attach={"background"} args={["#D0FEEF"]} />
      <fog attach={"fog"} args={["orange",30,60]} />
      <HotGround scale={5} args={[10,0.5,500,25]} position={[-30, 3, 0]} rotation={[0, Math.PI/2, 0]} />
      <ambientLight intensity={0.7} />
      <SceneOne />
      <OrbitControls />
    </>
  )
}
