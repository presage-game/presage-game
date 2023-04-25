import { useDispatch } from "react-redux"
import { Scene } from "./Scene"
import { changeScene, changePinpoint, resetScene, resetPinpoint } from "@/store/reducers/mapReducer"
import { OrbitControls } from "@react-three/drei"

export const Setup = () => {
  const dispatch = useDispatch()

  const goOnScene = (number) => {
    dispatch(changeScene(number))
  }

  const goOnPinpoint = (number) => {
    dispatch(changePinpoint(number))
  }

  const resetSceneFunction = () => {
    dispatch(resetScene())
  }

  const resetPinpointFunction = () => {
    dispatch(resetPinpoint())
  }

  return (
    <>
      <Scene
        goOnScene={goOnScene}
        goOnPinpoint={goOnPinpoint}
        resetScene={resetSceneFunction}
        resetPinpoint={resetPinpointFunction}
      />
      <color attach={"background"} args={["#D0FEEF"]} />
      {/* <ambientLight intensity={1} /> */}
      {/* <fog attach={"fog"} args={["black", 25, 120]} /> */}
      {/* <OrbitControls /> */}
    </>
  )
}
