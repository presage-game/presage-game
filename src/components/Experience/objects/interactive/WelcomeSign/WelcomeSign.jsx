import { useState } from "react"
import { Model } from "./WelcomeSignModel"

export const WelcomeSign = ({ mapClicked, setMapClicked, pubClicked, setPubClicked }) => {
  const [mapHovered, setMapHovered] = useState(false)
  const [pubHovered, setPubHovered] = useState(false)

  return (
    <Model
      position={[5, -6, -40]}
      rotation={[0, -Math.PI / 2, 0]}
      mapHovered={mapHovered}
      setMapHovered={setMapHovered}
      pubHovered={pubHovered}
      setPubHovered={setPubHovered}
      onMapClick={() => setMapClicked(!mapClicked)}
      onPubClick={() => setPubClicked(!pubClicked)}
    />
  )
}
