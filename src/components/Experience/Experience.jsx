import { Canvas } from "@react-three/fiber"
import { Loader } from "@react-three/drei"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useState } from "react"
import styles from "./Experience.module.scss"

import { Setup as Map } from "./Map/Setup"
import { Setup as RegionEntranceOne } from "./chapterOne/1/Setup"
import { Setup as PhosphateMine } from "./chapterOne/2/Setup"

import { MapTextBox } from "@/components/Interface/MapTextBox/MapTextBox"
import scriptData from "@/assets/data/chapterOne/pinpoints.json"

export const Experience = () => {
  const isOnMap = useSelector((state) => state.ui.isOnMap)
  const scene = useSelector((state) => state.user.scene)
  const { pinpoint: pinpointIndex } = useSelector((state) => state.user)

  const [displayUi, setDisplayUi] = useState(false)
  const [displayOptions, setDisplayOptions] = useState(false)
  const [textIndex, setTextIndex] = useState(0)

  useEffect(() => {
    if (scriptData[pinpointIndex]?.voiceover?.length > 0) {
      setDisplayUi(true)
      setDisplayOptions(true)
    }
  }, [pinpointIndex])

  return (
    <div className={styles.root}>
      {/* <Loader dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`} /> */}
      {isOnMap && displayUi && displayOptions && (
        <>
          <MapTextBox
            scriptData={scriptData}
            pinpointIndex={pinpointIndex}
            displayUi={displayUi}
            displayOptions={displayOptions}
            textIndex={textIndex}
            setDisplayUi={setDisplayUi}
            setTextIndex={setTextIndex}
            setDisplayOptions={setDisplayOptions}
          />
        </>
      )}
      <Canvas>{isOnMap ? <Map /> : scene === 0 ? <RegionEntranceOne /> : <PhosphateMine />}</Canvas>
    </div>
  )
}
