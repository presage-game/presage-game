import { useState, useEffect } from "react"
import { Scene } from "./Scene"
import { useDispatch } from "react-redux"
import { changeOnFocusCamera, changeOnFocusCameraPosition } from "@/store/reducers/userReducer"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { Environment } from "@react-three/drei"

export const Setup = ({ spotIndex, setSpotIndex }) => {
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
          z: 130,
        },
        rotation: {
          x: 0,
          y: -Math.PI / 4,
          z: 0,
        },
      })
      changeFocus(true)
    } else {
      changeFocus(false)
    }
  }, [pubClicked, mapClicked])

  useEffect(() => {
    if (pubClicked === false && mapClicked === false) {
      console.log("RESET THE INDEX")
      setSpotIndex(null)
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
        mapClicked={mapClicked}
        setMapClicked={setMapClicked}
        pubClicked={pubClicked}
        setPubClicked={setPubClicked}
      />
    </>
  )
}
