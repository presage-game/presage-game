import { useGLTF } from "@react-three/drei"
import { Plane } from "../../objects/vehicules/Plane/Plane"

export const RegionEntranceOneScene = () => {
  const obj = useGLTF("assets/scenes/scene_1.glb")
  return (
    <>
      <primitive object={obj.scene} dispose={null} />
      <Plane scale={7} position={[0, 8, 0]} rotation={[0, Math.PI / 2, 0]} />
    </>
  )
}
