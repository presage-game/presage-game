import { useState, useEffect } from "react"
import { Scene } from "./Scene"
import { useDispatch } from "react-redux"
import { changeOnFocusCamera, changeOnFocusCameraPosition } from "@/store/reducers/userReducer"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { Environment, Sky } from "@react-three/drei"
import { CloudsEffect } from "../../effects/CloudsEffect"
import { GoToMap } from "../../objects/interactive/GoToMap/GoToMap"
import { TempestEffect } from "../../effects/TempestEffect"

export const Setup = ({ variant }) => {
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
      <GoToMap args={[5, 5, 5]} position={[40, -2.5, -90]} />
      {variant === "default" ? (
        <>
          <Sky
            sunPosition={[10, 1, 2]}
            azimuth={180}
            rayleigh={2.0}
            mieCoefficient={0.05}
            mieDirectionalG={0.828}
          />
          <CloudsEffect position={[0, 40, -300]} variant={variant} numberOfClouds={20} />
        </>
      ) : (
        <>
          <color attach={"background"} args={["#be915b"]} />
          <fog attach={"fog"} args={["#be915b", 1, 50]} />
          <TempestEffect />
          <ambientLight color={"#be915b"} intensity={0.5} />
        </>
      )}
      <Scene
        variant={"default"}
        adinkraFocused={adinkraFocused}
        setAdinkraFocused={setAdinkraFocused}
      />
    </>
  )
}
