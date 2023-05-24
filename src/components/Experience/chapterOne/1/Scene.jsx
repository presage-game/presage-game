import { Model } from "./Model"
import { WelcomeSign } from "../../objects/interactive/WelcomeSign/WelcomeSign"

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
      <Model position={[11, -15, 93]} variant={variant} setVariant={setVariant} />
      <WelcomeSign
        pubClicked={pubClicked}
        setPubClicked={setPubClicked}
        mapClicked={mapClicked}
        setMapClicked={setMapClicked}
      />
    </>
  )
}
