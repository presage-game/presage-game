import { Box, Environment, OrbitControls, Plane } from "@react-three/drei"
import { PerspectiveCamera } from "@react-three/drei"

export const Scene = ({ goOnScene }) => {
  return (
    <>
      <OrbitControls />
      <PerspectiveCamera />
      <ambientLight color={"orange"} />
      <Box onClick={() => goOnScene(1)} position={[-2, 0, 0]} />
      <Box onClick={() => goOnScene(2)} position={[2, 0, 0]} />
      <Plane args={[15, 10]}>
        <meshBasicMaterial color="orange" />
      </Plane>
    </>
  )
}
