import { useState } from "react"

export const StationEntry = ({ Materials, nodes, entryFocused, setEntryFocused }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      <mesh
        geometry={nodes.petronas001_Cube_3_Instance_0032.geometry}
        material={Materials.fenceMaterial}
        position={[35.56, 14.7, 31.83]}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={() => setEntryFocused(true)}
        rotation={[Math.PI / 2, 0, 3.12]}
        scale={1.21}
      />
      <mesh
        geometry={nodes.petronas001_Cube_3_Instance_0032.geometry}
        material={isHovered && !entryFocused ? Materials.selectedMaterial : Materials.outlineMaterial}
        position={[35.59, 14.7, 31.84]}
        rotation={[Math.PI / 2, 0, 3.12]}
        scale={1.22}
      />
    </>
  )
}
