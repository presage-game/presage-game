import { MapScene } from "./MapScene"
import { useState, useRef } from "react"

export const Map = () => {
  const aspectRatio = window.innerWidth / window.innerHeight

  return (
    <>
      <color attach={"background"} args={["#D0FEEF"]} />
      <ambientLight intensity={1} />
      {/* <fog attach={"fog"} args={["black", 25, 120]} /> */}
      <MapScene frustumCulled={false}/>
      {/* <OrbitControls /> */}  
    </>
  )
}
