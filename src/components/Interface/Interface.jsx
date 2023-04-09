import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toggleBlackBars, toggleMap } from "@/store/reducers/uiReducer"
import scriptData from "@/assets/data/chapterOne/scenes.json"
import styles from "./Interface.module.scss"
import { BlackBars } from "@/components/BlackBars/BlackBars"
import { Meta } from "@/components/Interface/Meta/Meta"
import { SceneTextBox } from "@/components/Interface/SceneTextBox/SceneTextBox"
import { MapTextBox } from "@/components/Interface/MapTextBox/MapTextBox"

export const Interface = ({ mapActive }) => {
  const dispatch = useDispatch()
  const { showBlackBars } = useSelector((state) => state.ui)
  const { scene: sceneIndex } = useSelector((state) => state.user)

  const [showText, setShowText] = useState(false)
  const [isVoiceOver, setIsVoiceOver] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [spotIndex, setSpotIndex] = useState(0)
  const [textIndex, setTextIndex] = useState(0)

  return (
    <div className={styles.root}>
      {showBlackBars && <BlackBars />}
      <div
        style={{
          position: "absolute",
          right: "2rem",
          bottom: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          zIndex: "20",
          mixBlendMode: "difference",
        }}
      >
        <button onClick={() => dispatch(toggleMap())}>
          {mapActive ? "Close map" : "Open map"}
        </button>
        <button
          onClick={() => {
            dispatch(toggleBlackBars())
          }}
        >
          Black Bars
        </button>
      </div>
      {!mapActive && (
        <>
          <Meta
            sceneIndex={sceneIndex}
            scriptData={scriptData}
            showText={showText}
            setShowText={setShowText}
            setShowOptions={setShowOptions}
            setIsVoiceOver={setIsVoiceOver}
            setSpotIndex={setSpotIndex}
            setTextIndex={setTextIndex}
          />
          <SceneTextBox
            sceneIndex={sceneIndex}
            scriptData={scriptData}
            isVoiceOver={isVoiceOver}
            showOptions={showOptions}
            spotIndex={spotIndex}
            textIndex={textIndex}
            showText={showText}
            setTextIndex={setTextIndex}
            setShowOptions={setShowOptions}
            setShowText={setShowText}
          />
        </>
      )}
      <MapTextBox mapActive={mapActive} />
    </div>
  )
}
