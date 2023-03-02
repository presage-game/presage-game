import { Gltf, Select, useGLTF } from "@react-three/drei"
import { useRef, useState } from "react"
import { Model } from "./PlaneModel"

export const Plane = (props) => {
  const [hovered, hover] = useState(true)
  const ref = useRef()
  const test = useGLTF("assets/vehicules/plane.glb")

  const changeColor = (value) => {
    hover(value)
    console.log(ref.current)
  }

  return (
    <Select enabled>
      <Model scale={3}  position={[0, 8, 0]} rotation={[0, Math.PI / 2, 0]} />
    </Select>
  )
}
