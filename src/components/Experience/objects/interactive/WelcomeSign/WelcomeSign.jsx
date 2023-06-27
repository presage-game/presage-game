import { useState } from "react"
import { Model as MapSignModel } from "./MapSign"
import { Model as CitiesSignModel } from "./CitiesSign"

export const WelcomeSign = ({ mapFocused, setMapFocused, pubFocused, setPubFocused }) => {
  const [mapHovered, setMapHovered] = useState(false)
  const [pubHovered, setPubHovered] = useState(false)

  return (
    <>
      <MapSignModel
        position={[-11, -2.5, -29]}
        rotation={[0, -Math.PI / 2.5, 0]}
        mapFocused={mapFocused}
        mapHovered={mapHovered}
        setMapHovered={setMapHovered}
        onMapClick={() => setMapFocused(true)}
      />
      <CitiesSignModel
        position={[5, -2.2, -40]}
        rotation={[0, -Math.PI / 2, 0]}
        pubHovered={pubHovered}
        setPubHovered={setPubHovered}
        onPubClick={() => setPubFocused(!pubFocused)}
      />
    </>
  )
}
