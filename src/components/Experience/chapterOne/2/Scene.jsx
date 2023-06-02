import { useState, useEffect } from "react"
import { Model } from "./Model"
import { Environment } from "@react-three/drei"
import { AdinkraOne } from "../../objects/interactive/AdinkraOne/AdinkraOne"
import { getMaterials } from "@/helpers/materials/Materials"
import { Fence } from "../../objects/interactive/Fence/Fence"

export const Scene = ({
  variant,
  adinkraFocused,
  setAdinkraFocused,
  fenceFocused,
  setFenceFocused,
}) => {
  const [Materials, setMaterials] = useState(null)

  useEffect(() => {
    getMaterials(variant).then((result) => setMaterials(result))
  }, [])

  if (Materials === null) {
    return (
      <>
        <Environment files="/assets/hdri/rooitou_park_1k.hdr" />
      </>
    )
  }

  return (
    <>
      <Model position={[10, -15, 92]} Materials={Materials} />
      <AdinkraOne
        position={[10, -15, 92]}
        Materials={Materials}
        adinkraFocused={adinkraFocused}
        setAdinkraFocused={setAdinkraFocused}
      />
      <Fence
        position={[10, -15, 92]}
        Materials={Materials}
        fenceFocused={fenceFocused}
        setFenceFocused={setFenceFocused}
      />
    </>
  )
}
