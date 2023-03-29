import { Canvas } from "@react-three/fiber"
import { Loader } from "@react-three/drei"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import styles from "./Experience.module.scss"

import { Setup as Map } from "./Map/Setup"
import { Setup as RegionEntranceOne } from "./chapterOne/1/Setup"
import { Setup as PhosphateMine } from "./chapterOne/2/Setup"

export const Experience = () => {
  const isOnMap = useSelector((state) => state.ui.isOnMap)
  const scene = useSelector((state) => state.user.scene)

  return (
    <div className={styles.root}>
      {/* <Loader dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`} /> */}
      <Canvas>{isOnMap ? <Map /> : scene === 0 ? <RegionEntranceOne /> : <PhosphateMine />}</Canvas>
    </div>
  )
}
