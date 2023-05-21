import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { BufferGeometry, Float32BufferAttribute, PointsMaterial } from "three"

export const TempestEffect = () => {
  const disc = useTexture("/assets/materials/rain/disc.png")
  const lineRef = useRef(null)
  const rainGeometry = new BufferGeometry()
  const rainGeoPositions = []

  for (let i = 0; i < 60000; i++) {
    const x = Math.random() * 400 - 200
    const y = Math.random() * 500 - 250
    const z = Math.random() * 400 - 200

    rainGeoPositions.push(x, y, z)
  }

  rainGeometry.setAttribute("position", new Float32BufferAttribute(rainGeoPositions, 3))

  const config = {
    x: {
      min: 110,
      max: 90,
      speed: 30,
    },
    z: {
      min: -90,
      max: -60,
      speed: 18,
    },
    lineWidth: 1,
    linePositions: [
      [
        [-20, 8, -90],
        [-20, 9, -90],
      ],
    ],
  }

  useFrame((state, delta) => {
    lineRef.current.position.x += config.x.speed * delta
    lineRef.current.position.z += config.z.speed * delta
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
        <points
          material={new PointsMaterial({ transparent: true, sizeAttenuation: true, size: 0.3, alphaTest: 0, color: 0xE7C093, map: disc })}
          geometry={rainGeometry}
        ></points>
      </group>
    </>
  )
}
