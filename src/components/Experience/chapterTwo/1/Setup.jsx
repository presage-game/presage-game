import { Environment, Sky } from "@react-three/drei"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { CloudsEffect } from "../../effects/CloudsEffect"
import { Scene } from "./Scene"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { changeOnFocusCamera, changeOnFocusCameraPosition } from "@/store/reducers/userReducer"

export const Setup = ({ setSpotIndex, setShowText, isVoiceOver }) => {
  const dispatch = useDispatch()
  const changeFocus = (value) => dispatch(changeOnFocusCamera(value))
  const changeFocusPosition = (value) => dispatch(changeOnFocusCameraPosition(value))
  const [adinkraFocused, setAdinkraFocused] = useState(false)

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
    } else {
      changeFocus(false)
    }
  }, [adinkraFocused])

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
      <CloudsEffect position={[0, 40, -300]} variant={"default"} numberOfClouds={20} />
      <Sky
        sunPosition={[40, 10, 40]}
        azimuth={180}
        rayleigh={10.0}
        mieCoefficient={0.05}
        mieDirectionalG={0.828}
      />
      <Scene adinkraFocused={adinkraFocused} setAdinkraFocused={setAdinkraFocused} />
    </>
  )
}
