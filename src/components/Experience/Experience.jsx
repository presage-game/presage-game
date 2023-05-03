import { useSelector } from "react-redux"
import { useState } from "react"

import { Canvas } from "@react-three/fiber"

import { Setup as Map } from "./Map/Setup"
import { Setup as RegionEntranceOne } from "./chapterOne/1/Setup"
import { Setup as MegalithicCircles } from "./chapterOne/2/Setup"

import { Interface } from "@/components/Interface/Interface"
import { BlackBars } from "@/components/BlackBars/BlackBars"

import "./Experience.scss"

export const Experience = () => {
  const { scene } = useSelector((state) => state.map)
  const { mapActive } = useSelector((state) => state.ui)
  const [spotIndex, setSpotIndex] = useState(null)

  return (
    <div className="Experience">
      <BlackBars />
      <Interface mapActive={mapActive} spotIndex={spotIndex} />
      <Canvas>
        {mapActive ? (
          <Map />
        ) : scene === 0 ? (
          <RegionEntranceOne spotIndex={spotIndex} setSpotIndex={setSpotIndex} />
        ) : (
          <MegalithicCircles spotIndex={spotIndex} setSpotIndex={setSpotIndex} />
        )}
      </Canvas>
    </div>
  )
}
