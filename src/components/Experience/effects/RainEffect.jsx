import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { BufferGeometry, Float32BufferAttribute, PointsMaterial } from "three"

export const RainEffect = () => {
  const disc = useTexture("/assets/materials/rain/disc.png")
  const lineRef = useRef(null)
  const rainGeometry = new BufferGeometry()
  const rainGeoPositions = []

  for (let i = 0; i < 30000; i++) {
    const x = Math.random() * 400 - 200
    const y = Math.random() * 500 - 250
    const z = Math.random() * 400 - 200

    rainGeoPositions.push(x, y, z)
  }

  rainGeometry.setAttribute("position", new Float32BufferAttribute(rainGeoPositions, 3))

  const config = {
    y: {
      min: 100,
      max: -100,
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
          material={new PointsMaterial({ transparent: true, sizeAttenuation: true, size: 0.5, alphaTest: 0.8, color: 0x000000, map: disc })}
          geometry={rainGeometry}
        ></points>
      </group>
    </>
  )
}
