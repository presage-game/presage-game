import { AdinkraTwo } from "../../objects/interactive/AdinkraTwo/AdinkraTwo"
import { Model } from "./Model"
import { getMaterials } from "@/helpers/materials/Materials"
import { useState, useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import { PromotionalSign } from "../../objects/interactive/PromotionalSign/PromotionalSign"
import { StationEntry } from "../../objects/interactive/StationEntry/StationEntry"

export const Scene = ({
  adinkraFocused,
  setAdinkraFocused,
  signFocused,
  setSignFocused,
  entryFocused,
  setEntryFocused,
}) => {
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
      <group
        position={[25, -16, -70]}
        rotation={[0, -Math.PI / 2 + -Math.PI / 6, 0]}
        dispose={null}
      >
        <Model nodes={nodes} materials={materials} Materials={Materials} />
        <PromotionalSign
          Materials={Materials}
          nodes={nodes}
          signFocused={signFocused}
          setSignFocused={setSignFocused}
        />
        <StationEntry
          Materials={Materials}
          nodes={nodes}
          entryFocused={entryFocused}
          setEntryFocused={setEntryFocused}
        />
      </group>
      <AdinkraTwo
        nodes={nodes}
        Materials={Materials}
        adinkraFocused={adinkraFocused}
        setAdinkraFocused={setAdinkraFocused}
        position={[-30, 0.9, -48]}
        rotation={[0, Math.PI / 2 + Math.PI / 3, 0]}
      />
    </>
  )
}
