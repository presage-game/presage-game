import { useState } from "react"
import { useSelector } from "react-redux"

export const TreeTwo = ({ treeFocused, setTreeFocused, position, rotation, nodes, Materials }) => {
  const [isHovered, setIsHovered] = useState(false)
  const { adinkras } = useSelector((state) => state.user)
  const goodadinkra = adinkras.filter((adinkra) => adinkra.id === 2)

  const selectedOulineMaterial =
    !treeFocused && isHovered ? Materials.selectedMaterial : Materials.outlineMaterial

  return (
    <group
      onClick={() =>
        treeFocused !== true &&
        goodadinkra.length === 1 &&
        goodadinkra[0].isCollected &&
        setTreeFocused(!treeFocused)
      }
      onPointerEnter={() =>
        goodadinkra.length === 1 && goodadinkra[0].isCollected && setIsHovered(true)
      }
      onPointerLeave={() =>
        goodadinkra.length === 1 && goodadinkra[0].isCollected && setIsHovered(false)
      }
      position={position}
      rotation={rotation}
      dispose={null}
    >
      <group
        position={[-16.13, 23.07, 182.93]}
        rotation={[Math.PI, -1.26, 0]}
        scale={[-4.66, -3.74, -4.26]}
      >
        <mesh geometry={nodes.Cube050.geometry} material={Materials.treeMaterial} />
        <mesh geometry={nodes.Cube050_1.geometry} material={selectedOulineMaterial} />
      </group>
      <group
        position={[-12.21, 27.32, 181.95]}
        rotation={[0.01, 1.14, -3.07]}
        scale={[-6.19, -1.83, -5.93]}
      >
        <mesh geometry={nodes.Icosphere010.geometry} material={Materials.leafMaterial} />
        <mesh geometry={nodes.Icosphere010_1.geometry} material={selectedOulineMaterial} />
      </group>
      <group
        position={[-18.04, 25.35, 189.13]}
        rotation={[0.25, -0.93, -2.86]}
        scale={[-2.24, -0.84, -2.33]}
      >
        <mesh geometry={nodes.Icosphere012.geometry} material={Materials.leafMaterial} />
        <mesh geometry={nodes.Icosphere012_1.geometry} material={selectedOulineMaterial} />
      </group>
      <group
        position={[-22.65, 24.96, 182.41]}
        rotation={[-3.04, -1.41, 0.1]}
        scale={[-1.7, -0.9, -3.06]}
      >
        <mesh geometry={nodes.Icosphere009.geometry} material={Materials.leafMaterial} />
        <mesh geometry={nodes.Icosphere009_1.geometry} material={selectedOulineMaterial} />
      </group>
      <group position={[-9.38, 22.59, 186.37]} rotation={[0, 1.26, 0]} scale={[1.35, 0.88, 1.81]}>
        <mesh geometry={nodes.Icosphere011.geometry} material={Materials.leafMaterial} />
        <mesh geometry={nodes.Icosphere011_1.geometry} material={selectedOulineMaterial} />
      </group>
      <group
        position={[-13.69, 19.31, 184.49]}
        rotation={[-3.13, -1.41, -0.03]}
        scale={[-2.61, -2.79, -3.21]}
      >
        <mesh geometry={nodes.Cube051.geometry} material={Materials.leafMaterial} />
        <mesh geometry={nodes.Cube051_1.geometry} material={selectedOulineMaterial} />
      </group>
    </group>
  )
}
