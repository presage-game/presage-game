import { useState } from "react"
import { Model } from "./PlaneModel"

export const Plane = (props) => {
  const [hovered, hover] = useState(true)
  const changeColor = (value) => hover(value)

  return (
    <Model
      hovered={hovered}
      onPointerEnter={() => changeColor(true)}
      onPointerLeave={() => changeColor(false)}
      scale={3}
      position={[0, 8, 0]}
      rotation={[0, Math.PI / 2, 0]}
    />
  )
}
