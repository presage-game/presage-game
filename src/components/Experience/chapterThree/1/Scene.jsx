import { Model } from "./Model"
import { useControls } from "leva"
import { useState, useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import { getMaterials } from "@/helpers/materials/Materials"
import { SentierIslands } from "../../objects/decorative/SentierIslands/SentierIslands"
import { WaterFlasks } from "../../objects/decorative/WaterFlasks/WaterFlasks"
import { Radio } from "../../objects/interactive/Radio/Radio"

export const Scene = ({ isDream, isRaining, onClick }) => {
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
      {isDream ? (
        <SentierIslands Materials={Materials} nodes={nodes} />
      ) : (
        <Radio
          rotation={[-Math.PI / 80, Math.PI / 7, 0]}
          position={[0.9, -0.061, 0.3]}
          Materials={Materials}
          onClick={onClick}
        />
      )}
      {isRaining && !isDream && <WaterFlasks Materials={Materials} nodes={nodes} />}
    </group>
  )
}
