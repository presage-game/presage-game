import { useState, useEffect, Suspense } from "react"
import { Scene } from "./Scene"
import { useDispatch } from "react-redux"
import { changeOnFocusCamera, changeOnFocusCameraPosition } from "@/store/reducers/userReducer"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { Environment, PositionalAudio, Sky } from "@react-three/drei"
import { WindEffect } from "../../effects/WindEffect"
import { GoToMap } from "../../objects/interactive/GoToMap/GoToMap"
import { CloudsEffect } from "../../effects/CloudsEffect"

export const Setup = ({ setSpotIndex, setShowText, isVoiceOver }) => {
  const [variant, setVariant] = useState("default")
  const [pubClicked, setPubClicked] = useState(false)
  const [mapClicked, setMapClicked] = useState(false)

  const dispatch = useDispatch()
  const changeFocus = (value) => dispatch(changeOnFocusCamera(value))
  const changeFocusPosition = (value) => dispatch(changeOnFocusCameraPosition(value))

  useEffect(() => {
    if (pubClicked) {
      setMapClicked(false)
      setSpotIndex(0)
      changeFocusPosition({
        position: {
          x: -20,
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
    } else if (mapClicked) {
      setPubClicked(false)
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
  }, [pubClicked, mapClicked])

  /*
  const switchLerp = (value) => {
    changeFocusPosition({
      position: {
        x: -50,
        y: 0,
        z: 60,
      },
      rotation: {
        x: -Math.PI / 3,
        y: 0,
        z: 0,
      },
    })
    changeFocus(value)
  }
  */
  return (
    <>
      <Environment preset="park" />
      <CustomCamera />
      <Sky
        sunPosition={[10, 1, 2]}
        azimuth={180}
        rayleigh={2.0}
        mieCoefficient={0.05}
        mieDirectionalG={0.828}
      />
      <directionalLight
        intensity={variant === "default" ? 0.9 : 0.5}
        decay={2}
        position={[-50, 50, 50]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      {variant !== "default" && <ambientLight color={"#C65948"} intensity={0.5} />}
      {/* <HotGround
        scale={2}
        args={[30, 0.3, 500, 50]}
        position={[-30, 1, 0]}
        rotation={[-Math.PI / 2, Math.PI / 6, Math.PI / 2]}
      /> */}
      <GoToMap args={[5, 5, 50]} position={[-1, -2.5, -80]} />
      <Suspense fallback={null}>
        <PositionalAudio
          autoplay
          url="/assets/audios/atmospheric/1/wind.mp3"
          loop
          distance={4}
          position={[-12, -2.5, -50]}
        />
        <PositionalAudio
          url="/assets/audios/atmospheric/1/metal.mp3"
          loop
          autoplay
          distance={0.6}
          position={[5, -2.2, -40]}
        />
        <PositionalAudio
          url="/assets/audios/atmospheric/1/metal2.mp3"
          loop
          autoplay
          distance={0.6}
          position={[-12, -2.5, -30]}
        />
      </Suspense>
      <WindEffect />
      <CloudsEffect position={[0, 40, -300]} variant={variant} numberOfClouds={10} />
      <Scene
        variant={variant}
        setVariant={setVariant}
        mapClicked={mapClicked}
        setMapClicked={setMapClicked}
        pubClicked={pubClicked}
        setPubClicked={setPubClicked}
      />
    </>
  )
}
