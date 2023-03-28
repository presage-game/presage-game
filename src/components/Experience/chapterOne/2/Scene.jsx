import { PerspectiveCamera, Plane } from "@react-three/drei"

export const Scene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault />
      <ambientLight color={"orange"} />
      <Plane>
        <meshBasicMaterial color="red" />
      </Plane>
    </>
  )
}
