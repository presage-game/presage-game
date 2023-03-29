import { PerspectiveCamera } from "@react-three/drei"

export const CustomCamera = ({ initialPosition }) => {
  const defaultPosition = initialPosition
    ? initialPosition
    : {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
      }

  return <PerspectiveCamera makeDefault />
}
