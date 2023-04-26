import { useDispatch } from "react-redux"
import { Scene } from "./Scene"
import { changeScene, changePinpoint, resetScene, resetPinpoint } from "@/store/reducers/mapReducer"

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
      <directionalLight intensity={1} />
      <ambientLight intensity={0.2} />
      <Scene
        goOnScene={goOnScene}
        goOnPinpoint={goOnPinpoint}
        resetScene={resetSceneFunction}
        resetPinpoint={resetPinpointFunction}
      />
    </>
  )
}
