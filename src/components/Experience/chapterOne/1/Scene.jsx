import { Model } from "./Model"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { AdinkraThree } from "../../objects/interactive/AdinkraThree/AdinkraThree"
import { Environment } from "@react-three/drei"
import { WelcomeSign } from "../../objects/interactive/WelcomeSign/WelcomeSign"
import { useState } from "react"

export const Scene = ({ variant, setVariant, setPubHovered, setMapHovered }) => {
  //<ambientLight color={"orange"} />
  //<Model position={[8, -15, -12]} rotation={[0, 0, 0]} />

  return (
    <>
      <Model position={[9, -15, 93]} variant={variant} setVariant={setVariant} />
      <Environment preset="park" />
      <CustomCamera />
      <WelcomeSign setPubHovered={setPubHovered} setMapHovered={setMapHovered} />
    </>
  )
}
