import { Model } from "./Model"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { AdinkraThree } from "../../objects/interactive/AdinkraThree/AdinkraThree"
import { Gltf } from "@react-three/drei"

export const Scene = ({ switchLerp }) => {
  //<ambientLight color={"orange"} />
  //<Model position={[8, -15, -12]} rotation={[0, 0, 0]} />

  return (
    <>
      <AdinkraThree switchLerp={switchLerp} />
      <CustomCamera />
      <Gltf position={[8, -15, 100]} src="/assets/scenes/scene_1.2.glb" />
    </>
  )
}
