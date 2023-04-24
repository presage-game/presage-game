import { Model } from "./WelcomeSignModel"

export const WelcomeSign = ({ mapClicked, setMapClicked, pubClicked, setPubClicked }) => {
  return (
    <Model
      position={[5, -6, -40]}
      rotation={[0, -Math.PI / 2, 0]}
      onMapClick={() => setMapClicked(!mapClicked)}
      onPubClick={() => setPubClicked(!pubClicked)}
    />
  )
}
