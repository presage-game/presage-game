import { Scene } from "./Scene"
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HotGround } from "../../effects/HotGround"
import { changeNoLerp, changeOnFocusCamera } from "@/store/reducers/userReducer"
import { CameraLerp } from "@/helpers/animations/CameraLerp"

export const Setup = () => {
  const dispatch = useDispatch()
  const changeFocus = (value) => dispatch(changeOnFocusCamera(value))
  const onFocusCamera = useSelector((state) => state.user.onFocusCamera)
  const changeOnFocusCameraPosition = (value) => dispatch(changeOnFocusCameraPosition(value))
  const onFocusCameraPosition = useSelector((state) => state.user.onFocusCameraPosition)

  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      if (!onFocusCamera) {
        ref.current.position.x = CameraLerp(ref.current.position.x, 0)
        ref.current.position.y = CameraLerp(ref.current.position.y, 0)
        ref.current.position.z = CameraLerp(ref.current.position.z, 0)
        ref.current.rotation.x = CameraLerp(ref.current.rotation.x, 0)
        ref.current.rotation.y = CameraLerp(ref.current.rotation.y, state.mouse.x)
        ref.current.rotation.z = CameraLerp(ref.current.rotation.z, 0)
      } else {
        ref.current.position.x = CameraLerp(
          ref.current.position.x,
          onFocusCameraPosition.position.x
        )
        ref.current.position.y = CameraLerp(
          ref.current.position.y,
          onFocusCameraPosition.position.y
        )
        ref.current.position.z = CameraLerp(
          ref.current.position.z,
          onFocusCameraPosition.position.z
        )
        ref.current.rotation.x = CameraLerp(
          ref.current.rotation.x,
          onFocusCameraPosition.rotation.x
        )
        ref.current.rotation.y = CameraLerp(
          ref.current.rotation.y,
          !onFocusCamera ? state.mouse.x : onFocusCameraPosition.rotation.y
        )
        ref.current.rotation.z = CameraLerp(
          ref.current.rotation.z,
          onFocusCameraPosition.rotation.z
        )
      }
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
      <Scene cameraRef={ref} switchLerp={changeFocus} />
    </>
  )
}
