import { useDispatch } from "react-redux"
import { Scene } from "./Scene"
import { changeScene } from "@/store/reducers/userReducer"
import { toggleMap } from "@/store/reducers/uiReducer"

export const Setup = () => {
  const dispatch = useDispatch()

  const goOnScene = (number) => {
    dispatch(toggleMap())
    dispatch(changeScene(number))
  }

  const goOnPinPoint = (number) => {
    dispatch(toggleMap())
    // dispatch(changeScene(number))
    console.log("going to the selected pinpoint", number)
  }

  return (
    <>
      <Scene goOnScene={goOnScene} />
      <color attach={"background"} args={["#D0FEEF"]} />
      <ambientLight intensity={1} />
      {/* <fog attach={"fog"} args={["black", 25, 120]} /> */}
      {/* <OrbitControls /> */}
    </>
  )
}
