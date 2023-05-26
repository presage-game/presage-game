import { useState } from "react"
import { useSelector } from "react-redux"

import { Canvas } from "@react-three/fiber"

import { Setup as Map } from "./Map/Setup"
import { Setup as RegionEntranceOne } from "./chapterOne/1/Setup"
import { Setup as MegalithicCircles } from "./chapterOne/2/Setup"

import { Interface } from "@/components/Interface/Interface"
import { BlackBars } from "@/components/BlackBars/BlackBars"
import { AudioManager } from "@/components/Experience/tools/AudioManager/AudioManager"

import "./Experience.scss"
import { Preload, Stats } from "@react-three/drei"

export const Experience = () => {
  const { scene, pinpoint } = useSelector((state) => state.map)
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
            variant={"default"}
            setSpotIndex={setSpotIndex}
            setShowText={setShowText}
            isVoiceOver={isVoiceOver}
          />
        )}
        <Preload all />
        <Stats />
      </Canvas>
      <AudioManager sceneIndex={scene} pinpointIndex={pinpoint} mapActive={mapActive} />
    </div>
  )
}
