import { useState, useEffect } from "react"
import { Box, Environment, Sky } from "@react-three/drei"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { CloudsEffect } from "../../effects/CloudsEffect"
import { GoToMap } from "../../objects/interactive/GoToMap/GoToMap"
import { Scene } from "./Scene"
import { useDispatch } from "react-redux"
import { changeOnFocusCamera, changeOnFocusCameraPosition } from "@/store/reducers/userReducer"

export const Setup = () => {
  const [treeFocused, setTreeFocused] = useState(false)

  const dispatch = useDispatch()
  const changeFocus = (value) => dispatch(changeOnFocusCamera(value))
  const changeFocusPosition = (value) => dispatch(changeOnFocusCameraPosition(value))

  useEffect(() => {
    if (treeFocused) {
      changeFocusPosition({
        position: {
          x: 0,
          y: 4,
          z: 90,
        },
        rotation: {
          x: -Math.PI / 2,
          y: 0,
          z: 0,
        },
      })
      changeFocus(true)
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
        sunPosition={[0.01, 0.15, 3]}
        rayleigh={0.3}
        mieCoefficient={0.001}
        mieDirectionalG={0.5}
      />
      <GoToMap args={[7, 5, 5]} position={[42, -2.5, -70]} />
      <CloudsEffect position={[0, 40, -300]} variant={"default"} numberOfClouds={20} />
      <Scene treeFocused={treeFocused} setTreeFocused={setTreeFocused} />
    </>
  )
}
