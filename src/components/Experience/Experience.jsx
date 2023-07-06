import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { Canvas } from "@react-three/fiber"

import { Setup as Map } from "./Map/Setup"
import { Setup as RegionEntranceOne } from "./chapterOne/1/Setup"
import { Setup as MegalithicCircles } from "./chapterOne/2/Setup"
import { Setup as BaobabOne } from "./chapterOne/3/Setup"
import { Setup as KeurGnialo } from "./chapterTwo/1/Setup"
import { Setup as BaobabTwo } from "./chapterTwo/2/Setup"

import { Interface } from "@/components/Interface/Interface"
import { AudioManager } from "@/components/Experience/tools/AudioManager/AudioManager"

import "./Experience.scss"
import { Preload, Stats } from "@react-three/drei"
import { getSceneVariants } from "@/helpers/variants/getSceneVariant"
import { devUrlChecker } from "@/helpers/checkers/devUrlChecker"

export const Experience = ({ activateBlackBars, devMode }) => {
  const activeIntro = () => !devMode && showText && spotIndex === null
  const { scene, pinpoint } = useSelector((state) => state.map)
  const { mapActive } = useSelector((state) => state.ui)
  const { infos } = useSelector((state) => state.game)
  const [scenesVariant, setScenesVariant] = useState(() => getSceneVariants(infos))

  const [spotIndex, setSpotIndex] = useState(null)
  const [showText, setShowText] = useState(false)
  const [isIntroActive, setIsIntroActive] = useState(false)
  const [showPresage, setShowPresage] = useState(false)

  useEffect(() => {
    if (!mapActive) {
      setIsIntroActive(true)
    }
  }, [mapActive])

  return (
    <div className="Experience">
      <Interface
        mapActive={mapActive}
        spotIndex={spotIndex}
        showText={showText}
        setShowText={setShowText}
        isIntroActive={isIntroActive}
        setIsIntroActive={setIsIntroActive}
        showPresage={showPresage}
        setShowPresage={setShowPresage}
        activateBlackBars={activateBlackBars}
      />
      <Canvas style={{ position: "absolute", top: "0%", height: "100%" }}>
        {mapActive ? (
          <Map setShowText={setShowText} />
        ) : scene === 0 ? (
          <RegionEntranceOne
            spotIndex={spotIndex}
            setSpotIndex={setSpotIndex}
            showText={showText}
            setShowText={setShowText}
            isIntroActive={isIntroActive}
            activeIntro={activeIntro}
          />
        ) : scene === 1 ? (
          <MegalithicCircles
            variant={scenesVariant[0].value}
            spotIndex={spotIndex}
            setSpotIndex={setSpotIndex}
            showText={showText}
            setShowText={setShowText}
            isIntroActive={isIntroActive}
            activeIntro={activeIntro}
          />
        ) : scene === 2 ? (
          <BaobabOne
            setSpotIndex={setSpotIndex}
            setShowText={setShowText}
            isIntroActive={isIntroActive}
            setShowPresage={setShowPresage}
            activeIntro={activeIntro}
          />
        ) : scene === 3 ? (
          <KeurGnialo
            variant={scenesVariant[1].value}
            spotIndex={spotIndex}
            setSpotIndex={setSpotIndex}
            showText={showText}
            setShowText={setShowText}
            isIntroActive={isIntroActive}
            activeIntro={activeIntro}
          />
        ) : (
          <BaobabTwo />
        )}
        <Preload all />
        {devUrlChecker() && <Stats />}
      </Canvas>
      <AudioManager sceneIndex={scene} pinpointIndex={pinpoint} mapActive={mapActive} />
    </div>
  )
}
