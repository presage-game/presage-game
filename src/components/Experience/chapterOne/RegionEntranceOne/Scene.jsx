import { useGLTF, PerspectiveCamera, Environment, OrbitControls, Gltf } from "@react-three/drei"
import { Model } from "./Model"

export const Scene = ({ cameraRef }) => {
  //<Gltf src="/assets/scenes/scene_1.glb" />

  return (
    <>
      <PerspectiveCamera makeDefault ref={cameraRef} />
      <ambientLight color={"orange"} />
      <OrbitControls />
      <Model position={[8, -15, -12]} rotation={[0, 0, 0]} />
    </>
  )
}
