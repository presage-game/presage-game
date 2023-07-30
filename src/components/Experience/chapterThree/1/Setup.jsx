import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { Sky } from "@react-three/drei"
import { Scene } from "./Scene"
import { useEffect, useState } from "react"
import { RainEffect } from "../../effects/RainEffect"
import { useDispatch, useSelector } from "react-redux"
import { toggleRadioModule } from "@/store/reducers/uiReducer"
import { changeOnFocusCamera, changeOnFocusCameraPosition } from "@/store/reducers/userReducer"

export const Setup = () => {
  const [clickedRadio, setClickedRadio] = useState(false)
  const { radioModuleCompleted, adinkras } = useSelector((state) => state.user)
  const [islandFocused, setIslandFocused] = useState(false)
  const [adinkraCompleted, setAdinkraCompleted] = useState(false)
  const dispatch = useDispatch()
  const variant = "b"
  const isRaining = variant === "b" ? true : false
  const isDream = !radioModuleCompleted ? false : true

  const changeFocus = (value) => dispatch(changeOnFocusCamera(value))
  const changeFocusPosition = (value) => dispatch(changeOnFocusCameraPosition(value))

  const onClick = () => {
    console.log("click")
    if (!clickedRadio) {
      console.log("yep")
      setClickedRadio(true)
      dispatch(toggleRadioModule())
    }
  }

  useEffect(() => {
    if (islandFocused) {
      changeFocusPosition({
        position: {
          x: -5,
          y: -1,
          z: 160,
        },
        rotation: {
          x: -Math.PI + 3,
          y: -Math.PI / 6,
          z: 0,
        },
      })
      changeFocus(true)
    } else {
      changeFocus(false)
    }
  }, [islandFocused])

  useEffect(() => {
    if (adinkras[2].isCollected) {
      setAdinkraCompleted(true)
      setIslandFocused(false)
    }
  }, [adinkras])

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
      <Scene
        isDream={isDream}
        isRaining={isRaining}
        onClick={onClick}
        islandClick={() => !adinkraCompleted && setIslandFocused(true)}
        islandFocused={islandFocused}
        adinkraCompleted={adinkraCompleted}
      />
      {isRaining && !isDream && (
        <>
          <RainEffect />
        </>
      )}
    </>
  )
}
