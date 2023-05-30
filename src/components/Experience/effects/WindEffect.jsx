import { Line } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export const WindEffect = () => {
  const lineRef = useRef(null)

  const config = {
    x: {
      min: -110,
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

  useFrame((state,delta) => {
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
      <group ref={lineRef} dispose={null}>
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
