import { Environment, PositionalAudio, Sky } from "@react-three/drei"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { CloudsEffect } from "../../effects/CloudsEffect"
import { Scene } from "./Scene"
import { useState, useEffect, Suspense } from "react"
import { useDispatch } from "react-redux"
import { changeOnFocusCamera, changeOnFocusCameraPosition } from "@/store/reducers/userReducer"
import { GoToMap } from "../../objects/interactive/GoToMap/GoToMap"

export const Setup = ({ setSpotIndex, setShowText, isVoiceOver }) => {
  const [treeFocused, setTreeFocused] = useState(false)

  const dispatch = useDispatch()
  const changeFocus = (value) => dispatch(changeOnFocusCamera(value))
  const changeFocusPosition = (value) => dispatch(changeOnFocusCameraPosition(value))

  // useEffect(() => {
  //   setShowText(true)
  // }, [])

  useEffect(() => {
    if (treeFocused) {
      changeFocusPosition({
        position: {
          x: 0,
          y: 2,
          z: 100,
        },
        rotation: {
          x: -Math.PI / 2,
          y: 0,
          z: 0,
        },
      })
      changeFocus(true)
    } else {
      setSpotIndex(null)
      changeFocus(false)

      if (!isVoiceOver) {
        setShowText(false)
      }
    }
  }, [treeFocused])

  return (
    <>
      <Environment files="/assets/hdri/forest_slope_1k.hdr" />
      <CustomCamera />
      <directionalLight
        intensity={0.9}
        decay={2}
        position={[-50, 50, 50]}
        rotation={[-Math.PI / 2, 0, 0]}
        dispose={null}
      />
      <GoToMap args={[5, 5, 5]} position={[25, -2.5, -90]} />
      <Suspense fallback={null}>
        <PositionalAudio
          autoplay
          url="/audios/scenes/0/atmospheric/wind.mp3"
          loop
          distance={10}
          position={[-12, -2.5, -50]}
        />
      </Suspense>
      <Sky
        sunPosition={[40, 10, 40]}
        azimuth={180}
        rayleigh={10.0}
        mieCoefficient={0.05}
        mieDirectionalG={0.828}
      />
      <CloudsEffect position={[0, 40, -300]} variant={"default"} numberOfClouds={20} />
      <Scene treeFocused={treeFocused} setTreeFocused={setTreeFocused} />
    </>
  )
}
