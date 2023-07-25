import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { BufferGeometry, Float32BufferAttribute, PointsMaterial } from "three"

export const RainEffect = () => {
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
    y: {
      min: 100,
      max: -100,
      speed: 20,
    },
    z: {
      min: -130,
      max: -70,
      speed: 7,
    },
    lineWidth: 1,
    linePositions: [
      [
        [-20, 8, -90],
        [-20, 9, -130],
      ],
    ],
  }

  useFrame((state, delta) => {
    lineRef.current.position.y -= config.y.speed * delta
    lineRef.current.position.z += config.z.speed * delta
    if (lineRef.current.position.y <= config.y.max) {
      lineRef.current.position.y = config.y.min
      if (lineRef.current.position.z >= config.z.max) {
        lineRef.current.position.z = config.z.min
      }
    }
  })

  return (
    <>
      <group ref={lineRef} dispose={null}>
        <points
          material={new PointsMaterial({ transparent: true, sizeAttenuation: true, size: 0.5, alphaTest: 0.8, color: 0x2A3F60, map: disc })}
          geometry={rainGeometry}
        ></points>
      </group>
    </>
  )
}
