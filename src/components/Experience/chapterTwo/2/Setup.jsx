import { Environment, Sky } from "@react-three/drei"
import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { CloudsEffect } from "../../effects/CloudsEffect"
import { Scene } from "./Scene"

export const Setup = () => {
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
      <Sky
        sunPosition={[0.01, 0.15, 3]}
        rayleigh={0.3}
        mieCoefficient={0.001}
        mieDirectionalG={0.5}
      />
      <CloudsEffect position={[0, 40, -300]} variant={"default"} numberOfClouds={20} />
      <Scene />
    </>
  )
}
