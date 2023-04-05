import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toggleBlackBars, toggleMap } from "@/store/reducers/uiReducer"
import scriptData from "@/assets/data/chapterOne/scenes.json"
import styles from "./Interface.module.scss"
import { BlackBars } from "@/components/BlackBars/BlackBars"
import { Meta } from "@/components/Interface/Meta/Meta"
import { SceneTextBox } from "@/components/Interface/SceneTextBox/SceneTextBox"

export const Interface = () => {
  const dispatch = useDispatch()
  const { showBlackBars, isOnMap } = useSelector((state) => state.ui)
  const { scene: sceneIndex } = useSelector((state) => state.user)

  const [displayUi, setDisplayUi] = useState(false)
  const [isVoiceOver, setIsVoiceOver] = useState(false)
  const [displayOptions, setDisplayOptions] = useState(false)
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
        <button onClick={() => dispatch(toggleMap())}>{isOnMap ? "Close map" : "Open map"}</button>
        <button
          onClick={() => {
            dispatch(toggleBlackBars())
          }}
        >
          Black Bars
        </button>
      </div>
      {!isOnMap && (
        <>
          <Meta
            sceneIndex={sceneIndex}
            scriptData={scriptData}
            displayUi={displayUi}
            setDisplayUi={setDisplayUi}
            setDisplayOptions={setDisplayOptions}
            setIsVoiceOver={setIsVoiceOver}
            setSpotIndex={setSpotIndex}
            setTextIndex={setTextIndex}
          />
          <SceneTextBox
            sceneIndex={sceneIndex}
            scriptData={scriptData}
            isVoiceOver={isVoiceOver}
            displayOptions={displayOptions}
            spotIndex={spotIndex}
            textIndex={textIndex}
            displayUi={displayUi}
            setTextIndex={setTextIndex}
            setDisplayOptions={setDisplayOptions}
            setDisplayUi={setDisplayUi}
          />
        </>
      )}
    </div>
  )
}
