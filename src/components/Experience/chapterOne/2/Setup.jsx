import { useState, useEffect } from "react"
import { Scene } from "./Scene"
import { useDispatch } from "react-redux"
import { changeOnFocusCamera, changeOnFocusCameraPosition } from "@/store/reducers/userReducer"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { Environment } from "@react-three/drei"
import { CloudsEffect } from "../../effects/CloudsEffect"
import { GoToMap } from "../../objects/interactive/GoToMap/GoToMap"
import { TempestEffect } from "../../effects/TempestEffect"

export const Setup = () => {
  const [variant, setVariant] = useState("default")
  const [adinkraFocused, setAdinkraFocused] = useState(false)

  const dispatch = useDispatch()
  const changeFocus = (value) => dispatch(changeOnFocusCamera(value))
  const changeFocusPosition = (value) => dispatch(changeOnFocusCameraPosition(value))

  useEffect(() => {
    if (adinkraFocused) {
      changeFocusPosition({
        position: {
          x: 61,
          y: -2,
          z: 140,
        },
        rotation: {
          x: Math.PI / 6,
          y: Math.PI / 6,
          z: 0,
        },
      })
      changeFocus(true)
    } else {
      changeFocus(false)
    }
  }, [adinkraFocused])

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
      <Environment preset="forest" />
      <CustomCamera />
      <directionalLight
        intensity={variant === "default" ? 0.9 : 0.5}
        decay={2}
        position={[-50, 50, 50]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      {variant !== "default" && <ambientLight color={"#C65948"} intensity={0.5} />}
      <GoToMap args={[5, 5, 5]} position={[40, -2.5, -90]} />
      <fog attach={"fog"} args={["#be915b", 1, 50]} />
      <TempestEffect />
      <Scene
        variant={variant}
        setVariant={setVariant}
        adinkraFocused={adinkraFocused}
        setAdinkraFocused={setAdinkraFocused}
      />
    </>
  )
}
