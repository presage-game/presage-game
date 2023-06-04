import { Model } from "./Model"
import { WelcomeSign } from "../../objects/interactive/WelcomeSign/WelcomeSign"

export const Scene = ({
  variant,
  setVariant,
  pubFocused,
  setPubFocused,
  mapFocused,
  setMapFocused,
}) => {
  return (
    <>
      <Model position={[11, -15, 93]} variant={variant} setVariant={setVariant} />
      <WelcomeSign
        pubFocused={pubFocused}
        setPubFocused={setPubFocused}
        mapFocused={mapFocused}
        setMapFocused={setMapFocused}
      />
    </>
  )
}
