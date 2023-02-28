import { Box, Center, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

export const Game = () => {
  return (
    <Canvas>
      <Center>
        <Box />
      </Center>
      <OrbitControls />
    </Canvas>
  )
}
