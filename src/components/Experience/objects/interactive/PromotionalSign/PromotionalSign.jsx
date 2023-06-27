import { MeshBasicMaterial } from "three"
import { useTexture } from "@react-three/drei"
import { useState } from "react"

export const PromotionalSign = ({ signFocused, setSignFocused, nodes, Materials }) => {
  const [isHovered, setIsHovered] = useState(false)
  const pubTexture = useTexture("/assets/images/keurgnialo_pub.jpg")
  pubTexture.flipY = false

  const selectedHoveredOutline = isHovered ? Materials.selectedMaterial : Materials.outlineMaterial

  return (
    <>
      <group
        position={[-32.84, 17.31, 18.2]}
        rotation={[0, -0.49, -0.01]}
        scale={[0.12, 2.55, -3.62]}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={() => setSignFocused(!signFocused)}
      >
        <mesh geometry={nodes.Cube196.geometry} material={selectedHoveredOutline} />
        <mesh
          geometry={nodes.Cube196_1.geometry}
          material={new MeshBasicMaterial({ map: pubTexture })}
        />
      </group>
      <group
        position={[-33.05, 19.72, 19.81]}
        rotation={[-3.14, 0.49, 1.59]}
        scale={[0.02, 0.2, 0.02]}
      >
        <mesh geometry={nodes.Cube194.geometry} material={Materials.fenceMaterial} />
        <mesh geometry={nodes.Cube194_1.geometry} material={selectedHoveredOutline} />
      </group>
      <group
        position={[-31.62, 19.72, 16.94]}
        rotation={[-3.14, 0.49, 1.59]}
        scale={[0.02, 0.2, 0.02]}
      >
        <mesh geometry={nodes.Cube194.geometry} material={Materials.fenceMaterial} />
        <mesh geometry={nodes.Cube194_1.geometry} material={selectedHoveredOutline} />
      </group>
      <group
        position={[-32.86, 15.43, 17.79]}
        rotation={[0, -0.49, -0.01]}
        scale={[-0.01, 0.01, 0.02]}
      >
        <mesh geometry={nodes.Mesh234.geometry} material={Materials.fenceMaterial} />
        <mesh geometry={nodes.Mesh234_1.geometry} material={selectedHoveredOutline} />
      </group>
      <group
        position={[-32.81, 18.89, 17.83]}
        rotation={[0, -0.49, -0.01]}
        scale={[-0.01, 0.01, 0.02]}
      >
        <mesh geometry={nodes.Mesh234.geometry} material={Materials.fenceMaterial} />
        <mesh geometry={nodes.Mesh234_1.geometry} material={selectedHoveredOutline} />
      </group>
      <group
        position={[-32.84, 17.31, 18.2]}
        rotation={[0, -0.49, -0.01]}
        scale={[0.12, 2.55, -3.62]}
      >
        <mesh geometry={nodes.Cube197.geometry} material={Materials.fenceMaterial} />
        <mesh geometry={nodes.Cube197_1.geometry} material={selectedHoveredOutline} />
      </group>
    </>
  )
}
