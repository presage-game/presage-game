import { Environment, Sky } from "@react-three/drei"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { CloudsEffect } from "../../effects/CloudsEffect"
import { Scene } from "./Scene"

export const Setup = ({ setSpotIndex, setShowText, isVoiceOver }) => {
  return (
    <>
      <Environment files="/assets/hdri/forest_slope_1k.hdr" />
      <CustomCamera />
      <directionalLight
        intensity={0.9}
        decay={2}
        position={[-50, 50, 50]}
        rotation={[-Math.PI / 2, 0, 0]}
        dispose={null}
      />
      <CloudsEffect position={[0, 40, -300]} variant={"default"} numberOfClouds={20} />
      <Sky
        sunPosition={[40, 10, 40]}
        azimuth={180}
        rayleigh={10.0}
        mieCoefficient={0.05}
        mieDirectionalG={0.828}
      />
      <Scene />
    </>
  )
}
