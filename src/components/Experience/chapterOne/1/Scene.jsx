import { Model } from "./Model"
import { WelcomeSign } from "../../objects/interactive/WelcomeSign/WelcomeSign"
import { WindEffect } from "../../effects/WindEffect"
import { Box, PointerLockControls } from "@react-three/drei"

export const Scene = ({
  variant,
  setVariant,
  pubClicked,
  setPubClicked,
  mapClicked,
  setMapClicked,
}) => {
  return (
    <>
      <Model position={[9, -15, 93]} variant={variant} setVariant={setVariant} />
      <WindEffect />
      <WelcomeSign
        pubClicked={pubClicked}
        setPubClicked={setPubClicked}
        mapClicked={mapClicked}
        setMapClicked={setMapClicked}
      />
    </>
  )
}
