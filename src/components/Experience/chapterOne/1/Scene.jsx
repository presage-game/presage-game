import { Model } from "./Model"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { AdinkraThree } from "../../objects/interactive/AdinkraThree/AdinkraThree"

export const Scene = ({ switchLerp }) => {
  return (
    <>
      <AdinkraThree switchLerp={switchLerp} />
      <CustomCamera />
      <ambientLight color={"orange"} />
      <Model position={[8, -15, -12]} rotation={[0, 0, 0]} />
    </>
  )
}
