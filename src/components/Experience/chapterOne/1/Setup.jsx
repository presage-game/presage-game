import { useState } from "react"
import { Scene } from "./Scene"
import { useDispatch } from "react-redux"
import { HotGround } from "../../effects/HotGround"
import { changeOnFocusCamera, changeOnFocusCameraPosition } from "@/store/reducers/userReducer"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { Environment } from "@react-three/drei"

export const Setup = () => {
  const [variant, setVariant] = useState("default")

  const dispatch = useDispatch()
  const changeFocus = (value) => dispatch(changeOnFocusCamera(value))
  const changeFocusPosition = (value) => dispatch(changeOnFocusCameraPosition(value))

  // const switchLerp = (value) => {
  //   changeFocusPosition({
  //     position: {
  //       x: -50,
  //       y: 0,
  //       z: 60,
  //     },
  //     rotation: {
  //       x: -Math.PI / 3,
  //       y: 0,
  //       z: 0,
  //     },
  //   })
  //   changeFocus(value)
  // }

  const [pubHovered, setPubHovered] = useState(false)
  const [mapHovered, setMapHovered] = useState(false)

  return (
    <>
      <Environment preset="forest" />
      <CustomCamera />
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

      <Scene
        variant={variant}
        setVariant={setVariant}
        setMapHovered={setMapHovered}
        setPubHovered={setPubHovered}
      />
    </>
  )
}
