import { Canvas } from "@react-three/fiber"
import { Loader } from "@react-three/drei"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useState } from "react"
import styles from "./Experience.module.scss"

import { Setup as Map } from "./Map/Setup"
import { Setup as RegionEntranceOne } from "./chapterOne/1/Setup"
import { Setup as PhosphateMine } from "./chapterOne/2/Setup"

import { Interface } from "@/components/Interface/Interface"

export const Experience = () => {
  const { scene } = useSelector((state) => state.user)
  const { mapActive } = useSelector((state) => state.ui)

  return (
    <div className={styles.root}>
      <Interface mapActive={mapActive} />
      <Canvas>
        {mapActive ? <Map /> : scene === 0 ? <RegionEntranceOne /> : <PhosphateMine />}
      </Canvas>
    </div>
  )
}
