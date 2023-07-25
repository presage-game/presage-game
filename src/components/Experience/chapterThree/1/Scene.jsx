import { Model } from "./Model"
import { useControls } from "leva"
import { useState, useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import { getMaterials } from "@/helpers/materials/Materials"
import { SentierIslands } from "../../objects/decorative/SentierIslands/SentierIslands"

export const Scene = ({ isDream }) => {
  const gui = useControls({
    y: 0,
  })
  const { nodes, materials } = useGLTF("assets/scenes/sentier_default.glb")
  const [Materials, setMaterials] = useState(null)

  useEffect(() => {
    getMaterials("night").then((result) => setMaterials(result))
  }, [])

  if (Materials === null) {
    return <group></group>
  }

  return (
    <group position={[-3, -0.3, -46]} rotation={[0, -Math.PI / 3, 0]} scale={35} dispose={null}>
      <Model Materials={Materials} materials={materials} nodes={nodes} gui={gui} />
      {isDream && <SentierIslands Materials={Materials} materials={materials} nodes={nodes} />}
    </group>
  )
}
