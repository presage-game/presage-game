import { useState, useEffect } from "react"
import { Model } from "./Model"
import { Environment } from "@react-three/drei"
import { AdinkraOne } from "../../objects/interactive/AdinkraOne/AdinkraOne"
import { getMaterials } from "@/helpers/materials/Materials"

export const Scene = ({ variant, adinkraFocused, setAdinkraFocused }) => {
  const [Materials, setMaterials] = useState(null)

  useEffect(() => {
    getMaterials(variant).then((result) => setMaterials(result))
  }, [])

  if (Materials === null) {
    return (
      <>
        <Environment preset="park" />
      </>
    )
  }

  return (
    <>
      <Model position={[10, -15, 92]} Materials={Materials} />
      <AdinkraOne position={[10, -15, 92]} Materials={Materials} adinkraFocused={adinkraFocused} setAdinkraFocused={setAdinkraFocused} />
      <Environment preset="park" />
    </>
  )
}
