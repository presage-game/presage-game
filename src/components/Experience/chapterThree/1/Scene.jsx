import { Model } from "./Model"
import { useControls } from "leva"
import { useState, useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import { getMaterials } from "@/helpers/materials/Materials"
import { SentierIslands } from "../../objects/decorative/SentierIslands/SentierIslands"
import { WaterFlasks } from "../../objects/decorative/WaterFlasks/WaterFlasks"

export const Scene = ({ isDream, isRaining }) => {
  const gui = useControls({
    y: 0,
  })
  const { nodes, materials } = useGLTF("assets/scenes/sentier_default.glb")
  const [Materials, setMaterials] = useState(null)

  useEffect(() => {
    getMaterials(!isDream ? "night" : "dream").then((result) => setMaterials(result))
  }, [isDream])

  if (Materials === null) {
    return <group></group>
  }

  return (
    <group position={[-3, -0.3, -46]} rotation={[0, -Math.PI / 3, 0]} scale={35} dispose={null}>
      <Model Materials={Materials} materials={materials} nodes={nodes} gui={gui} />
      {isDream && <SentierIslands Materials={Materials} nodes={nodes} />}
      {isRaining && !isDream && <WaterFlasks Materials={Materials} nodes={nodes} />}
    </group>
  )
}
