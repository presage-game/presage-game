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
      <Model position={[10, -15, 92]} variant={variant} />
      <AdinkraOne adinkraFocused={adinkraFocused} setAdinkraFocused={setAdinkraFocused} />
      <Environment preset="park" />
    </>
  )
}
