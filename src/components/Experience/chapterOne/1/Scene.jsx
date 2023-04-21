import { Model } from "./Model"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { AdinkraThree } from "../../objects/interactive/AdinkraThree/AdinkraThree"
import { Environment } from "@react-three/drei"

export const Scene = ({ switchLerp }) => {
  //<ambientLight color={"orange"} />
  //<Model position={[8, -15, -12]} rotation={[0, 0, 0]} />

  return (
    <>
      <Environment preset="park" />
      <CustomCamera />
      <Model position={[9, -15, 93]} />
    </>
  )
}
