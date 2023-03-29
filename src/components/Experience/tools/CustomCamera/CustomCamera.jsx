import { PerspectiveCamera } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { CameraLerp } from "@/helpers/animations/CameraLerp"
import { useSelector } from "react-redux"
import { useRef } from "react"

export const CustomCamera = ({ initialPosition }) => {
  const ref = useRef()
  const defaultPosition = initialPosition
    ? initialPosition
    : {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
      }
  const onFocusCamera = useSelector((state) => state.user.onFocusCamera)
  const onFocusCameraPosition = useSelector((state) => state.user.onFocusCameraPosition)

  useFrame((state) => {
    if (ref.current) {
      if (!onFocusCamera) {
        ref.current.position.x = CameraLerp(ref.current.position.x, defaultPosition.position.x)
        ref.current.position.y = CameraLerp(ref.current.position.y, defaultPosition.position.y)
        ref.current.position.z = CameraLerp(ref.current.position.z, defaultPosition.position.z)
        ref.current.rotation.x = CameraLerp(ref.current.rotation.x, defaultPosition.rotation.x)
        ref.current.rotation.y = CameraLerp(ref.current.rotation.y, state.mouse.x)
        ref.current.rotation.z = CameraLerp(ref.current.rotation.z, defaultPosition.rotation.z)
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

  return <PerspectiveCamera ref={ref} makeDefault />
}
