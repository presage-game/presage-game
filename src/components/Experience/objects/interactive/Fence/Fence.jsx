import { useState } from "react"
import { Plane, useGLTF } from "@react-three/drei"

export const Fence = ({ position, Materials }) => {
  const { nodes } = useGLTF("assets/objects/fences/fence.glb")
  const [isHovered, setIsHovered] = useState(false)

  const selectedOulineMaterial = isHovered ? Materials.selectedMaterial : Materials.outlineMaterial

  return (
    <group
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      position={position}
    >
      <Plane args={[12, 3]} position={[-18.7, 13, -109]} rotation={[0,-Math.PI / 6,0]}>
        <meshBasicMaterial transparent opacity={0} />
      </Plane>
      <group position={[-13.79, 14.39, -106.77]} rotation={[1.58, 0.03, 0.42]} scale={0.41}>
        <mesh geometry={nodes.Fence_Cylinder003_1.geometry} material={Materials.fenceMaterial} />
        <mesh geometry={nodes.Fence_Cylinder003_2.geometry} material={selectedOulineMaterial} />
      </group>
      <group position={[-16.36, 13.97, -107.94]} rotation={[1.59, 0.11, 0.71]} scale={0.41}>
        <mesh geometry={nodes.Fence_Cylinder004_1.geometry} material={Materials.fenceMaterial} />
        <mesh geometry={nodes.Fence_Cylinder004_2.geometry} material={selectedOulineMaterial} />
      </group>
      <group position={[-20.67, 13.49, -111.67]} rotation={[Math.PI / 2, 0, 0.72]} scale={0.41}>
        <mesh geometry={nodes.Fence_Cylinder004_1.geometry} material={Materials.fenceMaterial} />
        <mesh geometry={nodes.Fence_Cylinder004_2.geometry} material={selectedOulineMaterial} />
      </group>
      <group position={[-19.66, 12.51, -110.83]} rotation={[1.4, -0.09, 0.6]} scale={0.41}>
        <mesh geometry={nodes.Fence_Cylinder005_1.geometry} material={Materials.fenceMaterial} />
        <mesh geometry={nodes.Fence_Cylinder005_2.geometry} material={selectedOulineMaterial} />
      </group>
      <group position={[-24.31, 12.56, -113.87]} rotation={[0.73, 0.08, -0.05]} scale={0.41}>
        <mesh geometry={nodes.Fence_Cylinder005_1.geometry} material={Materials.fenceMaterial} />
        <mesh geometry={nodes.Fence_Cylinder005_2.geometry} material={selectedOulineMaterial} />
      </group>
    </group>
  )
}

useGLTF.preload("assets/objects/fences/fence.glb")
