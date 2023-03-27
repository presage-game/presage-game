import { Scene } from "./Scene"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HotGround } from "../../effects/HotGround"
import { changeNoLerp } from "../../../../store/reducers/userReducer"
import { AdinkraOne } from "../../objects/interactive/AdinkraOne/AdinkraOne"
import { CameraLerp } from "../../../../helpers/animations/CameraLerp"

export const Setup = () => {
  const dispatch = useDispatch()
  const switchLerp = (value) => dispatch(changeNoLerp(value))
  const noLerp = useSelector((state) => state.user.noLerp)
  const changeNoLerpFocus = (value) => dispatch(changeNoLerpFocus(value))
  const noLerpFocus = useSelector((state) => state.user.noLerpFocus)

  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = CameraLerp(
        ref.current.rotation.y,
        !noLerp ? state.mouse.x : noLerpFocus.x,
        0
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
      <Scene cameraRef={ref} />
      <AdinkraOne switchLerp={switchLerp} />
    </>
  )
}
