import { AdinkraTwo } from "../../objects/interactive/AdinkraTwo/AdinkraTwo"
import { Model } from "./Model"
import { getMaterials } from "@/helpers/materials/Materials"
import { useState, useEffect } from "react"
import { useGLTF } from "@react-three/drei"

export const Scene = ({ adinkraFocused, setAdinkraFocused }) => {
  const { nodes, materials } = useGLTF("/assets/scenes/keur_gnialo.glb")

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
        nodes={nodes}
        materials={materials}
        Materials={Materials}
        position={[25, -16, -70]}
        rotation={[0, -Math.PI / 2 + -Math.PI / 6, 0]}
      />
      <AdinkraTwo
        nodes={nodes}
        Materials={Materials}
        adinkraFocused={adinkraFocused}
        setAdinkraFocused={setAdinkraFocused}
        position={[-30, 0.8, -48]}
        rotation={[0, Math.PI / 2 + Math.PI / 3, 0]}
      />
    </>
  )
}
