import { PerspectiveCamera } from "@react-three/drei"
import { Model } from "./Model"

export const Scene = ({ cameraRef }) => {
  //<PerspectiveCamera makeDefault />

  return (
    <>
      <PerspectiveCamera makeDefault ref={cameraRef} />
      <ambientLight color={"orange"} />
      <Model position={[8, -15, -12]} rotation={[0, 0, 0]} />
    </>
  )
}
