import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { IntroductionScene } from "./IntroductionScene"
import { HotGround } from "../../effects/HotGround"

export const Introduction = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[20, 3, 0]} rotation={[0, Math.PI / 2, 0]} />
      <color attach={"background"} args={["#D0FEEF"]} />
      <fog attach={"fog"} args={["orange",30,60]} />
      <HotGround scale={2} args={[30,0.3,500,50]} position={[-30, 1, 0]} rotation={[-Math.PI / 2, Math.PI / 6, Math.PI / 2]} />
      <ambientLight intensity={0.7} />
      <IntroductionScene />
      <OrbitControls />
    </>
  )
}
