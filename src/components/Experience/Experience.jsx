import { useSelector } from "react-redux"
import { useState } from "react"

import { Canvas } from "@react-three/fiber"

import { Setup as Map } from "./Map/Setup"
import { Setup as RegionEntranceOne } from "./chapterOne/1/Setup"
import { Setup as MegalithicCircles } from "./chapterOne/2/Setup"

import { Interface } from "@/components/Interface/Interface"
import { BlackBars } from "@/components/BlackBars/BlackBars"
import { Curtain } from "@/components/Curtain/Curtain"

import "./Experience.scss"

export const Experience = () => {
  const { scene } = useSelector((state) => state.map)
  const { mapActive } = useSelector((state) => state.ui)

  const [spotIndex, setSpotIndex] = useState(null)
  const [showText, setShowText] = useState(false)
  const [isVoiceOver, setIsVoiceOver] = useState(false)

  return (
    <div className="Experience">
      <BlackBars />
      <Interface
        mapActive={mapActive}
        spotIndex={spotIndex}
        showText={showText}
        setShowText={setShowText}
        isVoiceOver={isVoiceOver}
        setIsVoiceOver={setIsVoiceOver}
      />
      {/* {scene !== null && mapActive && <Curtain />} */}
      <Canvas style={{ position: "absolute", top: "0%", height: "100%" }}>
        {mapActive ? (
          <Map />
        ) : scene === 0 ? (
          <RegionEntranceOne
            setSpotIndex={setSpotIndex}
            setShowText={setShowText}
            isVoiceOver={isVoiceOver}
          />
        ) : (
          <MegalithicCircles
            setSpotIndex={setSpotIndex}
            setShowText={setShowText}
            isVoiceOver={isVoiceOver}
          />
        )}
      </Canvas>
    </div>
  )
}
