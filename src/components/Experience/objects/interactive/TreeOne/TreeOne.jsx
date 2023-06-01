import { useState } from "react"

export const TreeOne = ({ nodes, Materials, position, treeFocused, setTreeFocused }) => {
  const [isHovered, setIsHovered] = useState(false)

  const selectedOulineMaterial = !treeFocused && isHovered ? Materials.selectedMaterial : Materials.outlineMaterial

  return (
    <group onClick={() => treeFocused !== true && setTreeFocused(!treeFocused)} onPointerEnter={() => setIsHovered(true)} onPointerLeave={() => setIsHovered(false)} position={position} dispose={null}>
      <group
        position={[-10.19, 21.07, -124.3]}
        rotation={[-2.36, -1.36, -2.46]}
        scale={[-1.45, 0.54, 1.5]}
      >
        <mesh geometry={nodes.Icosphere008.geometry} material={Materials.leafMaterial} />
        <mesh geometry={nodes.Icosphere008_1.geometry} material={selectedOulineMaterial} />
      </group>
      <group
        position={[-15.53, 21.54, -122.01]}
        rotation={[2.7, 1.37, -2.71]}
        scale={[-1.05, 0.39, 1.09]}
      >
        <mesh geometry={nodes.Icosphere002.geometry} material={Materials.leafMaterial} />
        <mesh geometry={nodes.Icosphere002_1.geometry} material={selectedOulineMaterial} />
      </group>
      <group
        position={[-18.31, 21.77, -122.8]}
        rotation={[-0.31, -1.06, -0.35]}
        scale={[-1.05, 0.54, 1.49]}
      >
        <mesh geometry={nodes.Icosphere002.geometry} material={Materials.leafMaterial} />
        <mesh geometry={nodes.Icosphere002_1.geometry} material={selectedOulineMaterial} />
      </group>
      <group
        position={[-12.69, 20.73, -119.42]}
        rotation={[3.12, -0.34, 3.14]}
        scale={[-1.01, 0.53, 1.82]}
      >
        <mesh geometry={nodes.Icosphere001.geometry} material={Materials.leafMaterial} />
        <mesh geometry={nodes.Icosphere001_1.geometry} material={selectedOulineMaterial} />
      </group>
      <group
        position={[-14.5, 21.87, -126.97]}
        rotation={[0.02, 0.65, -0.01]}
        scale={[-1.21, 0.53, 2.03]}
      >
        <mesh geometry={nodes.Icosphere006.geometry} material={Materials.leafMaterial} />
        <mesh geometry={nodes.Icosphere006_1.geometry} material={selectedOulineMaterial} />
      </group>
      <group
        position={[-13.79, 12.21, -123.52]}
        rotation={[Math.PI, -0.2, Math.PI]}
        scale={[-3, 2.41, 2.75]}
      >
        <mesh geometry={nodes.Cube048.geometry} material={Materials.treeMaterial} />
        <mesh geometry={nodes.Cube048_1.geometry} material={selectedOulineMaterial} />
      </group>
    </group>
  )
}
