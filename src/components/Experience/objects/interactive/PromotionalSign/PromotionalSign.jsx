import { MeshBasicMaterial } from "three"
import { useTexture } from "@react-three/drei"
import { useState } from "react"

export const PromotionalSign = ({ signFocused, setSignFocused, nodes, Materials }) => {
  const [isHovered, setIsHovered] = useState(false)
  const pubTexture = useTexture("/assets/images/keurgnialo_pub.jpg")
  pubTexture.flipY = false

  return (
    <group
      position={[-32.84, 17.31, 18.2]}
      rotation={[0, -0.49, -0.01]}
      scale={[0.12, 2.55, -3.62]}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setSignFocused(!signFocused)}
    >
      <mesh
        geometry={nodes.Cube196.geometry}
        material={isHovered ? Materials.selectedMaterial : Materials.outlineMaterial}
      />
      <mesh
        geometry={nodes.Cube196_1.geometry}
        material={new MeshBasicMaterial({ map: pubTexture })}
      />
    </group>
  )
}
