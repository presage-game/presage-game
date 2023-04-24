import { Scene } from "./Scene"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { HotGround } from "../../effects/HotGround"
import { changeOnFocusCamera, changeOnFocusCameraPosition } from "@/store/reducers/userReducer"

export const Setup = () => {
  const dispatch = useDispatch()
  const changeFocus = (value) => dispatch(changeOnFocusCamera(value))
  const changeFocusPosition = (value) => dispatch(changeOnFocusCameraPosition(value))

  const [variant, setVariant] = useState("default")

  const switchLerp = (value) => {
    changeFocusPosition({
      position: {
        x: -50,
        y: 0,
        z: 60,
      },
      rotation: {
        x: -Math.PI / 3,
        y: 0,
        z: 0,
      },
    })
    changeFocus(value)
  }

  return (
    <>
      <HotGround
        scale={2}
        args={[30, 0.3, 500, 50]}
        position={[-30, 1, 0]}
        rotation={[-Math.PI / 2, Math.PI / 6, Math.PI / 2]}
      />
      <Scene switchLerp={switchLerp} variant={variant} setVariant={setVariant} />
    </>
  )
}
