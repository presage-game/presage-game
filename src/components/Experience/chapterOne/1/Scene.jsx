import { Model } from "./Model"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { Environment } from "@react-three/drei"
import { WelcomeSign } from "../../objects/interactive/WelcomeSign/WelcomeSign"

export const Scene = ({
  variant,
  setVariant,
  pubClicked,
  setPubClicked,
  mapClicked,
  setMapClicked,
}) => {
  //<ambientLight color={"orange"} />
  //<Model position={[8, -15, -12]} rotation={[0, 0, 0]} />

  return (
    <>
      <Model position={[9, -15, 93]} variant={variant} setVariant={setVariant} />
      <Environment preset="park" />
      <CustomCamera />
      <WelcomeSign
        pubClicked={pubClicked}
        setPubClicked={setPubClicked}
        mapClicked={mapClicked}
        setMapClicked={setMapClicked}
      />
    </>
  )
}
