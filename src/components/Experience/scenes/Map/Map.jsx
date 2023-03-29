import { Environment, OrbitControls, OrthographicCamera } from "@react-three/drei"
import { MapScene } from "./MapScene"
import { useState } from "react"

export const Map = () => {
  return (
    <>
      <color attach={"background"} args={["#D0FEEF"]} />
      <ambientLight intensity={1} />
      {/* <fog attach={"fog"} args={["black", 25, 120]} /> */}
      <MapScene />
      {/* <OrbitControls /> */}
    </>
  )
}
