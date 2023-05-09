import { Line } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { BufferGeometry, Float32BufferAttribute, MathUtils, PointsMaterial, Vector3 } from "three"

export const RainEffect = () => {
  const lineRef = useRef(null)
  const rainGeometry = new BufferGeometry()
  const rainGeoPositions = []

  for (let i = 0; i < 100; i++) {
    const x = Math.random() * 400 - 200
    const y = Math.random() * 500 - 250
    const z = Math.random() * 400 - 200

    rainGeoPositions.push(x, y, z)
  }
  console.log(rainGeoPositions)

  rainGeometry.setAttribute("position", new Float32BufferAttribute(rainGeoPositions, 3))

  const config = {
    y: {
      min: 100,
      max: -12,
      speed: 0.3,
    },
    z: {
      min: -90,
      max: -60,
      speed: 0.1,
    },
    lineWidth: 1,
    linePositions: [
      [
        [-20, 8, -90],
        [-20, 9, -90],
      ],
    ],
  }

  useFrame(() => {
    lineRef.current.position.y -= config.y.speed
    lineRef.current.position.z += config.z.speed
    if (lineRef.current.position.y <= config.y.max) {
      lineRef.current.position.y = config.y.min
      if (lineRef.current.position.z >= config.z.max) {
        lineRef.current.position.z = config.z.min
      }
    }
  })

  return (
    <>
      <group ref={lineRef}>
        <points
          material={new PointsMaterial({ transparent: true, size: 10, alphaTest: 0.5, color: 0xaaaaaa })}
          geometry={rainGeometry}
        ></points>
      </group>
    </>
  )
}
