import { useState, useEffect, useRef } from "react"
import { Scene } from "./Scene"
import { useDispatch, useSelector } from "react-redux"
import { changeOnFocusCamera, changeOnFocusCameraPosition } from "@/store/reducers/userReducer"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { Environment, PositionalAudio, Sky } from "@react-three/drei"
import { WindEffect } from "../../effects/WindEffect"
import { GoToMap } from "../../objects/interactive/GoToMap/GoToMap"
import { CloudsEffect } from "../../effects/CloudsEffect"
import { useFrame } from "@react-three/fiber"
import { LightLerp } from "@/helpers/animations/LightLerp"

export const Setup = ({
  spotIndex,
  setSpotIndex,
  showText,
  setShowText,
  isVoiceOver,
  activeIntro,
}) => {
  const { sceneEntranceAnimation } = useSelector((state) => state.user)
  const lightRef = useRef(null)
  const [variant, setVariant] = useState("default")
  const [pubFocused, setPubFocused] = useState(false)
  const [mapFocused, setMapFocused] = useState(false)
  const [playPositionnalAudio, setPlayPositionnalAudio] = useState(false)

  const dispatch = useDispatch()
  const changeFocus = (value) => dispatch(changeOnFocusCamera(value))
  const changeFocusPosition = (value) => dispatch(changeOnFocusCameraPosition(value))

  useEffect(() => {
    if (spotIndex === null) {
      if (pubFocused) {
        setMapFocused(false)
        changeFocusPosition({
          position: {
            x: -29,
            y: -2,
            z: 205,
          },
          rotation: {
            x: Math.PI / 6,
            y: Math.PI / 15,
            z: 0,
          },
        })
        changeFocus(true)
      } else if (mapFocused) {
        setPubFocused(false)
        setSpotIndex(1)
        changeFocusPosition({
          position: {
            x: 75,
            y: -3,
            z: 120,
          },
          rotation: {
            x: 0,
            y: -Math.PI / 4,
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
    }

    if (spotIndex !== null && showText === false) {
      if (pubFocused) {
        setPubFocused(false)
      }
      if (mapFocused) {
        setMapFocused(false)
      }

      setSpotIndex(null)
      changeFocus(false)

      if (!isVoiceOver) {
        setShowText(false)
      }
    }
  }, [pubFocused, mapFocused, showText])

  useEffect(() => {
    setShowText(true)
    setPlayPositionnalAudio(true)

    return () => {
      setSpotIndex(null)
    }
  }, [])

  /*
  base sky pour keur gnialo
    <Sky
        sunPosition={[10000, 1, 10]}
        azimuth={180}
        rayleigh={20.0}
        mieCoefficient={0.05}
        mieDirectionalG={0.828}
        inclination={100}
      />
  */

  useFrame((state, delta) => {
    if (lightRef.current && sceneEntranceAnimation) {
      if (lightRef.current.intensity < 0.89) {
        lightRef.current.intensity = LightLerp(lightRef.current.intensity, 0.9, 0.1 * delta)
      }
      if (lightRef.current.position.y < 49.9) {
        lightRef.current.position.y = LightLerp(lightRef.current.position.y, 50, 1 * delta)
      }
    }
  })

  return (
    <>
      <Environment files="/assets/hdri/rooitou_park_1k.hdr" />
      <CustomCamera />
      <Sky
        sunPosition={[0.01, 0.15, 3]}
        rayleigh={0.3}
        mieCoefficient={0.001}
        mieDirectionalG={0.5}
      />
      <directionalLight
        intensity={0.2}
        decay={2}
        position={[-50, 20, 50]}
        rotation={[-Math.PI / 2, 0, 0]}
        dispose={null}
        ref={lightRef}
      />
      <GoToMap
        args={[5, 5, 50]}
        position={[-1, -2.5, -80]}
        disable={mapFocused || pubFocused || activeIntro()}
      />
      {playPositionnalAudio && (
        <>
          <PositionalAudio
            autoplay
            url="/audios/scenes/0/atmospheric/wind.mp3"
            loop
            distance={4}
            position={[-12, -2.5, -50]}
          />
          <PositionalAudio
            url="/audios/scenes/0/atmospheric/metal.mp3"
            loop
            autoplay
            distance={0.6}
            position={[5, -2.2, -40]}
          />
          <PositionalAudio
            url="/audios/scenes/0/atmospheric/metal2.mp3"
            loop
            autoplay
            distance={0.6}
            position={[-12, -2.5, -30]}
          />
        </>
      )}

      <WindEffect />
      <CloudsEffect position={[0, 40, -300]} variant={variant} numberOfClouds={20} />
      <Scene
        variant={variant}
        setVariant={setVariant}
        mapFocused={mapFocused}
        setMapFocused={setMapFocused}
        pubFocused={pubFocused}
        setPubFocused={setPubFocused}
      />
    </>
  )
}
