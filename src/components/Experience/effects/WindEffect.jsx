import { Line } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"

export const WindEffect = () => {
  const lineRef = useRef(null)

  const config = {
    x: {
      min: -110,
      max: 90,
      speed: 0.5,
    },
    z: {
      min: -90,
      max: -60,
      speed: 0.3,
    },
    lineWidth: 1,
    linePositions: [
      [
        [-20, 8, -93],
        [-15, 8, -90],
      ],
      [
        [-5, 6, -83],
        [0, 6, -80],
      ],
      [
        [10, 8, -43],
        [15, 8, -40],
      ],
      [
        [-5, 8, -23],
        [0, 8, -20],
      ],
      [
        [-15, 11, -13],
        [-10, 11, -10],
      ],
    ],
  }

  useFrame(() => {
    lineRef.current.position.x += config.x.speed
    lineRef.current.position.z += config.z.speed
    if (lineRef.current.position.x >= config.x.max) {
      lineRef.current.position.x = config.x.min
      if (lineRef.current.position.z >= config.z.max) {
        lineRef.current.position.z = config.z.min
      }
    }
  })

  return (
    <>
      <group ref={lineRef}>
        {config.linePositions.map((position, index) => (
          <Line
            key={index}
            points={position}
            segments
            lineWidth={config.lineWidth}
            color={"white"}
          />
        ))}
      </group>
    </>
  )
}
