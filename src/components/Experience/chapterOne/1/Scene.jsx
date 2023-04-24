import { Model } from "./Model"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { AdinkraThree } from "../../objects/interactive/AdinkraThree/AdinkraThree"
import { Environment } from "@react-three/drei"

export const Scene = ({ switchLerp, variant, setVariant }) => {
  return (
    <>
      <Environment preset="forest" />
      <CustomCamera />
      <directionalLight
        intensity={0.9}
        decay={2}
        position={[-50, 50, 50]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      {variant === "!default" && <ambientLight color={"white"} intensity={0.5} />}
      <Model position={[9, -15, 93]} variant={variant} setVariant={setVariant} />
    </>
  )
}
