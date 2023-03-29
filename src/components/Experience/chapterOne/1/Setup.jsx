import { Scene } from "./Scene"
import { useDispatch } from "react-redux"
import { HotGround } from "../../effects/HotGround"
import { changeOnFocusCamera } from "@/store/reducers/userReducer"

export const Setup = () => {
  const dispatch = useDispatch()
  const changeFocus = (value) => dispatch(changeOnFocusCamera(value))
  const changeOnFocusCameraPosition = (value) => dispatch(changeOnFocusCameraPosition(value))

  return (
    <>
      <HotGround
        scale={2}
        args={[30, 0.3, 500, 50]}
        position={[-30, 1, 0]}
        rotation={[-Math.PI / 2, Math.PI / 6, Math.PI / 2]}
      />
      <Scene switchLerp={changeFocus} />
    </>
  )
}
