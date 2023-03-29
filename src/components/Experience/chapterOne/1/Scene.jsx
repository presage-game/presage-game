import { AdinkraOne } from "../../objects/interactive/AdinkraOne/AdinkraOne"
import { Model } from "./Model"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"

export const Scene = ({ switchLerp }) => {

  return (
    <>
      <AdinkraOne switchLerp={switchLerp} />
      <CustomCamera />
      <ambientLight color={"orange"} />
      <Model position={[8, -15, -12]} rotation={[0, 0, 0]} />
    </>
  )
}
