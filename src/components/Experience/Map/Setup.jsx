import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Scene } from "./Scene"
import {
  changeScene,
  changePinpoint,
  resetScene,
  resetPinpoint,
  intersectScene,
  intersectPinpoint,
} from "@/store/reducers/mapReducer"
import { devUrlChecker } from "@/helpers/checkers/devUrlChecker"
import { button, useControls } from "leva"
import { toggleMap } from "@/store/reducers/uiReducer"

export const Setup = ({ setShowText }) => {
  const [sceneNumber, setSceneNumber] = useState(0)
  const [changeSceneState, setChangeSceneState] = useState(false)
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

  const gui =
    devUrlChecker() &&
    useControls({
      RegionEntranceOne: button(() => {
        setSceneNumber(0)
        setChangeSceneState(true)
      }),
      MegalithicCircles: button(() => {
        setSceneNumber(1)
        setChangeSceneState(true)
      }),
      BaobabOne: button(() => {
        setSceneNumber(2)
        setChangeSceneState(true)
      }),
      KeurGnialo: button(() => {
        setSceneNumber(3)
        setChangeSceneState(true)
      }),
      BaobabTwo: button(() => {
        setSceneNumber(4)
        setChangeSceneState(true)
      }),
      Sentier: button(() => {
        setSceneNumber(5)
        setChangeSceneState(true)
      }),
    })

  useEffect(() => {
    if (changeSceneState === true) {
      goOnScene(sceneNumber)
      dispatch(toggleMap())
    }
  }, [changeSceneState])

  useEffect(() => {
    setShowText(false)

    return () => {
      dispatch(intersectScene(false))
    }
  }, [])

  return (
    <>
      <directionalLight intensity={1} dispose={null} />
      <ambientLight intensity={0.2} dispose={null} />
      <fog attach={"fog"} display={false} />
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
