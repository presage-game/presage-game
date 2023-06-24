import { useState, useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import { getMaterials } from "@/helpers/materials/Materials"
import { TreeTwo } from "../../objects/interactive/TreeTwo/TreeTwo"
import { Model } from "./Model"

export const Scene = ({ treeFocused, setTreeFocused }) => {
  const { nodes, materials } = useGLTF("/assets/scenes/baobab_2.glb")
  const position = [30, -17, -222]
  const rotation = [0, -Math.PI / 40, 0]

  const [Materials, setMaterials] = useState(null)

  useEffect(() => {
    getMaterials("default").then((result) => setMaterials(result))
  }, [])

  if (Materials === null) {
    return <group></group>
  }

  return (
    <>
      <Model
        rotation={rotation}
        position={position}
        nodes={nodes}
        Materials={Materials}
        materials={materials}
      />
      <TreeTwo
        treeFocused={treeFocused}
        setTreeFocused={setTreeFocused}
        rotation={rotation}
        position={position}
        nodes={nodes}
        Materials={Materials}
      />
    </>
  )
}
