import { useSelector } from "react-redux"

import { Canvas } from "@react-three/fiber"

import { Setup as Map } from "./Map/Setup"
import { Setup as RegionEntranceOne } from "./chapterOne/1/Setup"
import { Setup as PhosphateMine } from "./chapterOne/2/Setup"

import { Interface } from "@/components/Interface/Interface"
import { BlackBars } from "@/components/BlackBars/BlackBars"

import styles from "./Experience.module.scss"
import { EffectComposer, SSAO } from "@react-three/postprocessing"
import { useControls } from "leva"
import { BlendFunction } from "postprocessing"

export const Experience = () => {
  const { scene } = useSelector((state) => state.map)
  const { mapActive } = useSelector((state) => state.ui)
  const { HighGraphics, blendFunction } = useControls({
    HighGraphics: {
      label: "High graphics",
      value: false,
    },
  })

  return (
    <div className={styles.root}>
      <BlackBars />
      <Interface mapActive={mapActive} />
      <Canvas>
        {mapActive ? <Map /> : scene === 0 ? <RegionEntranceOne /> : <PhosphateMine />}
        {HighGraphics && (
          <EffectComposer multisampling={0}>
            <SSAO samples={30} radius={10} intensity={30} luminanceInfluence={0.2} distanceFalloff={0.7} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}
