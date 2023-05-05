import { Model } from "./Model"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { Environment } from "@react-three/drei"
import { WelcomeSign } from "../../objects/interactive/WelcomeSign/WelcomeSign"

export const Scene = ({
  variant,
  setVariant,
  pubClicked,
  setPubClicked,
  mapClicked,
  setMapClicked,
}) => {
  return (
    <>
      <Model position={[9, -15, 93]} variant={variant} setVariant={setVariant} />
      <Environment preset="park" />
    </>
  )
}
