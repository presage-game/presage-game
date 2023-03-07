import { useState } from "react"
import { Model } from "./PlaneModel"

export const Plane = (props) => {
  const [hovered, hover] = useState(false)
  const changeColor = (value) => hover(value)

  return (
    <Model
      hovered={hovered}
      onPointerEnter={() => changeColor(true)}
      onPointerLeave={() => changeColor(false)}
      scale={8}
      position={[-5, 3, 2]}
      rotation={[0, Math.PI / 4, 0]}
    />
  )
}
