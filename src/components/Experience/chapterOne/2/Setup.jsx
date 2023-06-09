import { useState, useEffect, Suspense } from "react"
import { Scene } from "./Scene"
import { useDispatch } from "react-redux"
import { changeOnFocusCamera, changeOnFocusCameraPosition } from "@/store/reducers/userReducer"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { Environment, PositionalAudio, Sky } from "@react-three/drei"
import { GoToMap } from "../../objects/interactive/GoToMap/GoToMap"
import { TempestEffect } from "../../effects/TempestEffect"

export const Setup = ({ setSpotIndex, setShowText, isVoiceOver, variant }) => {
  const [adinkraFocused, setAdinkraFocused] = useState(false)
  const [fenceFocused, setFenceFocused] = useState(false)

  const dispatch = useDispatch()
  const changeFocus = (value) => dispatch(changeOnFocusCamera(value))
  const changeFocusPosition = (value) => dispatch(changeOnFocusCameraPosition(value))

  useEffect(() => {
    if (adinkraFocused) {
      setFenceFocused(false)
      setSpotIndex(1)
      changeFocusPosition({
        position: {
          x: -10,
          y: -2,
          z: 120,
        },
        rotation: {
          x: Math.PI / 6,
          y: -Math.PI / 6,
          z: 0,
        },
      })
      changeFocus(true)
    } else if (fenceFocused) {
      setAdinkraFocused(false)
      setSpotIndex(0)
      changeFocusPosition({
        position: {
          x: 35,
          y: 4,
          z: 60,
        },
        rotation: {
          x: Math.PI / 6,
          y: -Math.PI / 3,
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
  }, [adinkraFocused, fenceFocused])

  useEffect(() => {
    setShowText(true)

    return () => {
      setSpotIndex(null)
    }
  }, [])

  return (
    <>
      <Environment files="/assets/hdri/forest_slope_1k.hdr" />
      <CustomCamera />
      <directionalLight
        intensity={variant === "default" ? 0.9 : 0.5}
        decay={2}
        position={[-50, 50, 50]}
        rotation={[-Math.PI / 2, 0, 0]}
        dispose={null}
      />
      <GoToMap args={[5, 5, 5]} position={[40, -2.5, -90]} />
      <Suspense fallback={null}>
        <PositionalAudio
          autoplay
          url="/audios/scenes/0/atmospheric/wind.mp3"
          loop
          distance={10}
          position={[-12, -2.5, -50]}
        />
        {/* <PositionalAudio
          autoplay
          url="/audios/scenes/1/atmospheric/fences.mp3"
          loop
          distance={2}
          position={[0, 5, 10]}
        /> */}
      </Suspense>
      {variant === "b" ? (
        <>
          <Sky
            sunPosition={[80, 100, 80]}
            rayleigh={0.13}
            mieCoefficient={0.002}
            mieDirectionalG={1}
          />
        </>
      ) : (
        <>
          <color attach={"background"} args={["#be915b"]} />
          <fog attach={"fog"} args={["#be915b", 1, 50]} />
          <TempestEffect />
          <ambientLight color={"#be915b"} intensity={0.5} dispose={null} />
        </>
      )}
      <Scene
        variant={"default"}
        adinkraFocused={adinkraFocused}
        setAdinkraFocused={setAdinkraFocused}
        fenceFocused={fenceFocused}
        setFenceFocused={setFenceFocused}
      />
    </>
  )
}
