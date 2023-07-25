import { CustomCamera } from "../../tools/CustomCamera/CustomCamera"
import { Sky } from "@react-three/drei"
import { Scene } from "./Scene"
import { RainEffect } from "../../effects/RainEffect"

export const Setup = () => {
  const variant = "b"

  /*
  ciel onirique
  <Sky
        sunPosition={[10000, 1, 10]}
        azimuth={180}
        rayleigh={20.0}
        mieCoefficient={0.05}
        mieDirectionalG={0.828}
        inclination={100}
      />
  */

  return (
    <>
      <CustomCamera />
      <Sky
        sunPosition={[100, 1, 100]}
        azimuth={180}
        rayleigh={50.0}
        mieCoefficient={0.05}
        mieDirectionalG={0.828}
        inclination={100}
      />
      <directionalLight
        intensity={0.6}
        decay={2}
        position={[-50, 50, 50]}
        rotation={[-Math.PI / 2, 0, 0]}
        dispose={null}
      />
      <Scene />
      {variant === "b" && (
        <>
          <RainEffect />
        </>
      )}
    </>
  )
}
