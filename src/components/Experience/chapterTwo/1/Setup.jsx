import { Environment, PositionalAudio, Sky } from "@react-three/drei"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { CloudsEffect } from "../../effects/CloudsEffect"
import { Scene } from "./Scene"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { changeOnFocusCamera, changeOnFocusCameraPosition } from "@/store/reducers/userReducer"
import { GoToMap } from "../../objects/interactive/GoToMap/GoToMap"

export const Setup = ({ setSpotIndex, setShowText, isVoiceOver, variant }) => {
  const dispatch = useDispatch()
  const changeFocus = (value) => dispatch(changeOnFocusCamera(value))
  const changeFocusPosition = (value) => dispatch(changeOnFocusCameraPosition(value))
  const [adinkraFocused, setAdinkraFocused] = useState(false)
  const [signFocused, setSignFocused] = useState(false)
  const [entryFocused, setEntryFocused] = useState(false)
  const [playPositionnalAudio, setPlayPositionnalAudio] = useState(false)

  useEffect(() => {
    if (adinkraFocused) {
      setSpotIndex(1)
      changeFocusPosition({
        position: {
          x: 220,
          y: -2,
          z: 250,
        },
        rotation: {
          x: 0,
          y: Math.PI / 2 + Math.PI / 3,
          z: 0,
        },
      })
      changeFocus(true)
    } else if (signFocused) {
      changeFocusPosition({
        position: {
          x: -120,
          y: -4,
          z: 600,
        },
        rotation: {
          x: 0,
          y: Math.PI / 2,
          z: 0,
        },
      })
      changeFocus(true)
    } else if (entryFocused) {
      setSpotIndex(0)
      changeFocusPosition({
        position: {
          x: 50,
          y: -2,
          z: 250,
        },
        rotation: {
          x: 0,
          y: -Math.PI / 2,
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
  }, [adinkraFocused, signFocused, entryFocused])

  useEffect(() => {
    setShowText(true)
    setPlayPositionnalAudio(true)

    return () => {
      setSpotIndex(null)
    }
  }, [])

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
      <GoToMap args={[5, 5, 5]} position={[28, -2.5, -60]} />
      {playPositionnalAudio && (
        <>
          <PositionalAudio
            autoplay
            url="/audios/scenes/0/atmospheric/wind.mp3"
            loop
            distance={1}
            position={[-12, -2.5, -50]}
          />
          {variant === "a" && (
            <PositionalAudio
              autoplay
              url="/audios/scenes/3/atmospheric/gas-station.mp3"
              loop
              distance={2}
              position={[-15, 0, -55]}
            />
          )}
        </>
      )}
      <CloudsEffect position={[0, 40, -300]} variant={"default"} numberOfClouds={20} />
      <Sky sunPosition={[8, 1, 8]} rayleigh={0.6} mieCoefficient={0.001} mieDirectionalG={0.9} />
      <Scene
        adinkraFocused={adinkraFocused}
        setAdinkraFocused={setAdinkraFocused}
        signFocused={signFocused}
        setSignFocused={setSignFocused}
        entryFocused={entryFocused}
        setEntryFocused={setEntryFocused}
      />
    </>
  )
}
