import { Box } from "@react-three/drei"

export const AdinkraOne = () => {
  const rizzPlayer = new Audio("/assets/audio/adinkraOne/Rizz.mp3")
  const pianoPlayer = new Audio("/assets/audio/adinkraOne/Piano.mp3")

  return (
    <>
      <group position={[-8, 0, -30]} rotation={[0, Math.PI / 4, 0]}>
        <Box position={[-3, 0, 0]} />
        <Box position={[-1, 0, 0]} />
        <Box position={[1, 0, 0]} />
        <Box position={[3, 0, 0]} />
      </group>
    </>
  )
}
