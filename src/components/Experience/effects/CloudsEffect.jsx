import { Box, useGLTF } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import { getMaterials } from "@/helpers/materials/Materials"

export const CloudsEffect = ({ position, variant }) => {
  const cloudsRef = useRef(null)
  const [Materials, setMaterials] = useState(null)
  const { nodes } = useGLTF("/assets/objects/clouds/cloud.glb")

  useEffect(() => {
    getMaterials(variant).then((result) => setMaterials(result))
  }, [])

  useEffect(() => {
    console.log(nodes)
  }, [])

  if (Materials === null) {
    return <group></group>
  }

  return (
    <>
      <group position={position} ref={cloudsRef}>
        <group rotation={[Math.PI / 2, 0, -0.09]} scale={[0.03, 0.02, 0.01]}>
          <mesh geometry={nodes.Mesh077.geometry} material={Materials.cloudMaterial} />
          <mesh geometry={nodes.Mesh077_1.geometry} material={Materials.outlineMaterial} />
        </group>
      </group>
    </>
  )
}
