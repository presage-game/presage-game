import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Scene } from "./Scene"
import { ScreenQuad } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HotGround } from "../../effects/HotGround"
import { changeNoLerp } from "../../../../store/reducers/userReducer"
import { AdinkraOne } from "../../objects/interactive/AdinkraOne/AdinkraOne"
import { MathUtils } from "three"

export const Setup = () => {
  const dispatch = useDispatch()
  const switchLerp = (value) => dispatch(changeNoLerp(value))
  const noLerp = useSelector((state) => state.user.noLerp)
  //<fog attach={"fog"} args={["orange",30,60]} />
  /*
  <ScreenQuad scale={200} rotation={[0,Math.PI/2,0]} position={[-200, 0, -10]}>
        <meshBasicMaterial />
  </ScreenQuad>
  */

  const ref = useRef()
  useFrame((state) => {
    if (!noLerp) {
      ref.current.rotation.y = MathUtils.lerp(
        ref.current.rotation.y,
        -(state.mouse.x * Math.PI) / 20 + Math.PI / 3,
        0.05
      )
      ref.current.rotation.x = MathUtils.lerp(
        ref.current.rotation.x,
        (state.mouse.y * Math.PI) / 20,
        0.05
      )
    }
  })

  return (
    <>
      <HotGround
        scale={2}
        args={[30, 0.3, 500, 50]}
        position={[-30, 1, 0]}
        rotation={[-Math.PI / 2, Math.PI / 6, Math.PI / 2]}
      />
      <Scene />
      <AdinkraOne switchLerp={switchLerp} />
    </>
  )
}
