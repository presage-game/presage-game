import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { Sky } from "@react-three/drei"
import { Scene } from "./Scene"
import { useState } from "react"
import { RainEffect } from "../../effects/RainEffect"
import { useDispatch, useSelector } from "react-redux"
import { toggleRadioModule } from "@/store/reducers/uiReducer"

export const Setup = () => {
  const [clickedRadio, setClickedRadio] = useState(false)
  const { radioModuleCompleted } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const variant = "b"
  const isRaining = variant === "b" ? true : false
  const isDream = !radioModuleCompleted ? false : true

  const onClick = () => {
    if (!clickedRadio) {
      setClickedRadio(true)
      dispatch(toggleRadioModule())
    }
  }

  /*
  ciel onirique
  <Sky
        sunPosition={[10000, 1, 10]}
        azimuth={180}
        rayleigh={20.0}
        mieCoefficient={0.05}
        mieDirectionalG={0.828}
        inclination={100}
      />
  */

  return (
    <>
      <CustomCamera />
      <Sky
        sunPosition={[100, 1, 100]}
        azimuth={180}
        rayleigh={50.0}
        mieCoefficient={0.05}
        mieDirectionalG={0.828}
        inclination={100}
      />
      <directionalLight
        intensity={0.6}
        decay={2}
        position={[-50, 50, 50]}
        rotation={[-Math.PI / 2, 0, 0]}
        dispose={null}
      />
      <Scene isDream={isDream} isRaining={isRaining} onClick={onClick} />
      {isRaining && !isDream && (
        <>
          <RainEffect />
        </>
      )}
    </>
  )
}
