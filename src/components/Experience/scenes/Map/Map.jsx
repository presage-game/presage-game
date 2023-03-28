import { Environment, OrbitControls, OrthographicCamera } from "@react-three/drei"
import { MapScene } from "./MapScene"

export const Map = () => {
  return (
    <>
      <OrthographicCamera makeDefault position={[20, 7, 2]} />
      <color attach={"background"} args={["#D0FEEF"]} />
      <ambientLight intensity={1} />
      <MapScene />
      <OrbitControls />
    </>
  )
}
