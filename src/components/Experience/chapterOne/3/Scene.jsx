import { useState, useEffect } from "react"
import { Model } from "./Model"
import { getMaterials } from "@/helpers/materials/Materials"
import { useGLTF } from "@react-three/drei"
import { TreeOne } from "../../objects/interactive/TreeOne/TreeOne"

export const Scene = ({ treeFocused, setTreeFocused, adinkras }) => {
  const { nodes, materials } = useGLTF("assets/scenes/baobab_1.glb")

  const [Materials, setMaterials] = useState(null)

  useEffect(() => {
    getMaterials("default").then((result) => setMaterials(result))
  }, [])

  if (Materials === null) {
    return <group dispose={null}></group>
  }

  return (
    <>
      <Model nodes={nodes} materials={materials} Materials={Materials} position={[14, -15, 92]} />
      <TreeOne nodes={nodes} Materials={Materials} position={[14, -15, 92]} treeFocused={treeFocused} setTreeFocused={setTreeFocused} adinkras={adinkras} />
    </>
  )
}
