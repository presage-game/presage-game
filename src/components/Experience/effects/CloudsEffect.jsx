import { useGLTF } from "@react-three/drei"
import { useEffect, useMemo, useRef, useState } from "react"
import { getMaterials } from "@/helpers/materials/Materials"
import { useFrame } from "@react-three/fiber"

export const CloudsEffect = ({ position, variant, numberOfClouds }) => {
  const cloudsRef = useRef(null)
  const [Materials, setMaterials] = useState(null)

  const generateClouds = () => {
    const tab = []

    for (let i = 0; i < numberOfClouds; i++) {
      const x = Math.random() * 300
      const xdir = Math.random() > 0.5 ? 1 : -1
      const y = Math.random() * 30
      const z = Math.random() * 200

      const scalex = Math.random() * (0.05 - 0.03) + 0.03
      const scaley = Math.random() * (0.05 - 0.03) + 0.03
      const scalez = Math.random() * (0.02 - 0.01) + 0.01

      tab.push({
        x: x * xdir,
        y: y,
        z: z,
        scale: {
          x: scalex,
          y: scaley,
          z: scalez,
        },
      })
    }

    return tab
  }

  const cloudsPositions = useMemo(() => generateClouds(), [numberOfClouds])
  const { nodes } = useGLTF("/assets/objects/clouds/cloud.glb")

  const config = {
    x: {
      min: -450,
      max: 450,
      speed: 0.01,
    },
    z: {
      min: -90,
      max: -60,
      speed: 0,
    },
  }

  useFrame(() => {
    cloudsRef.current.position.x += config.x.speed
    cloudsRef.current.position.z += config.z.speed
    if (cloudsRef.current.position.x >= config.x.max) {
      cloudsRef.current.position.x = config.x.min
      if (cloudsRef.current.position.z >= config.z.max) {
        cloudsRef.current.position.z = config.z.min
      }
    }
  })

  useEffect(() => {
    getMaterials(variant).then((result) => setMaterials(result))
  }, [])

  if (Materials === null) {
    return <group position={position} ref={cloudsRef}></group>
  }

  return (
    <>
      <group position={position} ref={cloudsRef} dispose={null}>
        {cloudsPositions.map((cloud, i) => (
          <group
            key={i}
            rotation={[Math.PI / 2, 0, -0.09]}
            scale={[cloud.scale.x, cloud.scale.y, cloud.scale.z]}
            position={[cloud.x, cloud.y, cloud.z]}
          >
            <mesh geometry={nodes.Mesh077.geometry} material={Materials.cloudMaterial} />
            <mesh geometry={nodes.Mesh077_1.geometry} material={Materials.outlineMaterial} />
          </group>
        ))}
      </group>
    </>
  )
}
