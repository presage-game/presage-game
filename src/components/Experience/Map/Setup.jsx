import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Scene } from "./Scene"
import {
  changeScene,
  changePinpoint,
  resetScene,
  resetPinpoint,
  intersectScene,
  intersectPinpoint,
} from "@/store/reducers/mapReducer"

export const Setup = () => {
  const { isSceneIntersecting, isPinpointIntersecting } = useSelector((state) => state.map)

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

  const intersectSceneFunction = (intersect) => {
    dispatch(intersectScene(intersect))
  }

  const intersectPinpointFunction = (intersect) => {
    dispatch(intersectPinpoint(intersect))
  }

  useEffect(() => {
    return () => {
      dispatch(intersectScene(false))
      console.log("Scene intersecting reset")
    }
  }, [])

  return (
    <>
      <directionalLight intensity={1} />
      <ambientLight intensity={0.2} />
      <Scene
        goOnScene={goOnScene}
        goOnPinpoint={goOnPinpoint}
        resetScene={resetSceneFunction}
        resetPinpoint={resetPinpointFunction}
        intersectScene={intersectSceneFunction}
        intersectPinpoint={intersectPinpointFunction}
      />
    </>
  )
}
