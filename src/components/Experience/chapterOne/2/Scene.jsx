import { Model } from "./Model"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { Environment } from "@react-three/drei"
import { WelcomeSign } from "../../objects/interactive/WelcomeSign/WelcomeSign"
import { AdinkraOne } from "../../objects/interactive/AdinkraOne/AdinkraOne"

export const Scene = ({
  variant,
  setVariant,
  adinkraFocused,
  setAdinkraFocused
}) => {
  return (
    <>
      <Model position={[9, -15, 93]} variant={variant} setVariant={setVariant} />
      <AdinkraOne adinkraFocused={adinkraFocused} setAdinkraFocused={setAdinkraFocused} />
      <Environment preset="park" />
    </>
  )
}
