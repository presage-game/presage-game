import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Scene } from "./Scene"
import { ScreenQuad } from "@react-three/drei"
import { HotGround } from "../../effects/HotGround"
import { AdinkraOne } from "../../objects/interactive/AdinkraOne/AdinkraOne"

export const Setup = () => {
  //<fog attach={"fog"} args={["orange",30,60]} />
  /*
  <ScreenQuad scale={200} rotation={[0,Math.PI/2,0]} position={[-200, 0, -10]}>
        <meshBasicMaterial />
  </ScreenQuad>
  */

  return (
    <>
      <HotGround
        scale={2}
        args={[30, 0.3, 500, 50]}
        position={[-30, 1, 0]}
        rotation={[-Math.PI / 2, Math.PI / 6, Math.PI / 2]}
      />
      <Scene />
    </>
  )
}