import { Model } from "./WelcomeSignModel"

export const WelcomeSign = ({ mapHovered, setMapHovered, pubHovered, setPubHovered }) => {
  return (
    <Model
      position={[5, -6, -40]}
      rotation={[0, -Math.PI / 2, 0]}
      onMapClick={() => setMapHovered(!mapHovered)}
      onPubClick={() => setPubHovered(!pubHovered)}
    />
  )
}
