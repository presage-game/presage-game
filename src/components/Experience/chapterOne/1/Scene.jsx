import { Model } from "./Model"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"

export const Scene = ({ switchLerp }) => {

  return (
    <>
      <CustomCamera />
      <ambientLight color={"orange"} />
      <Model position={[8, -15, -12]} rotation={[0, 0, 0]} />
    </>
  )
}
