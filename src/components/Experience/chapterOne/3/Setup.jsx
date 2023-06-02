import { Environment, Sky } from "@react-three/drei"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { CloudsEffect } from "../../effects/CloudsEffect"
import { Scene } from "./Scene"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { changeOnFocusCamera, changeOnFocusCameraPosition } from "@/store/reducers/userReducer"

export const Setup = ({ setSpotIndex, setShowText, isVoiceOver }) => {
  const [treeFocused, setTreeFocused] = useState(false)

  const dispatch = useDispatch()
  const changeFocus = (value) => dispatch(changeOnFocusCamera(value))
  const changeFocusPosition = (value) => dispatch(changeOnFocusCameraPosition(value))

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
      changeFocus(false)
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
