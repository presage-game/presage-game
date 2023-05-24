import { Model } from "./Scene_cercles"
import { Environment } from "@react-three/drei"
import { AdinkraOne } from "../../objects/interactive/AdinkraOne/AdinkraOne"

export const Scene = ({
  variant,
  adinkraFocused,
  setAdinkraFocused
}) => {
  return (
    <>
      <Model position={[9, -15, 93]} variant={variant} />
      <AdinkraOne adinkraFocused={adinkraFocused} setAdinkraFocused={setAdinkraFocused} />
      <Environment preset="park" />
    </>
  )
}
