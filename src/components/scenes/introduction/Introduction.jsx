import { Center } from "@react-three/drei"

export const Introduction = () => {
  return (
    <Center>
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color={"white"} />
      </mesh>
    </Center>
  )
}
