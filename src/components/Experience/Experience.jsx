import { useSelector } from "react-redux"

import { Canvas } from "@react-three/fiber"

import { Setup as Map } from "./Map/Setup"
import { Setup as RegionEntranceOne } from "./chapterOne/1/Setup"
import { Setup as PhosphateMine } from "./chapterOne/2/Setup"

import { Interface } from "@/components/Interface/Interface"
import { BlackBars } from "@/components/BlackBars/BlackBars"

import styles from "./Experience.module.scss"

export const Experience = () => {
  const { scene } = useSelector((state) => state.map)
  const { mapActive } = useSelector((state) => state.ui)

  return (
    <div className={styles.root}>
      <BlackBars />
      <Interface mapActive={mapActive} />
      <Canvas>
        {mapActive ? <Map /> : scene === 0 ? <RegionEntranceOne /> : <PhosphateMine />}
      </Canvas>
    </div>
  )
}
