import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toggleBlackBars, toggleMap } from "@/store/reducers/uiReducer"
import scriptData from "@/assets/data/chapterOne/scenes.json"
import styles from "./Interface.module.scss"
import { BlackBars } from "@/components/BlackBars/BlackBars"
import { Meta } from "@/components/Interface/Meta/Meta"
import { TextBox } from "@/components/Interface/TextBox/TextBox"
import { AsideTextBox } from "@/components/Interface/AsideTextBox/AsideTextBox"

export const Interface = () => {
  const dispatch = useDispatch()
  const { showBlackBars, isOnMap } = useSelector((state) => state.ui)
  const { scene: sceneIndex } = useSelector((state) => state.user)

  const [displayUi, setDisplayUi] = useState(false)
  const [isVoiceOver, setIsVoiceOver] = useState(false)
  const [displayOptions, setDisplayOptions] = useState(false)
  const [spotIndex, setSpotIndex] = useState(0)
  const [textIndex, setTextIndex] = useState(0)

  const [textBoxStyle, setTextBoxStyle] = useState("classic")

  return (
    <section className={styles.root}>
      {showBlackBars && <BlackBars />}
      <div
        style={{
          position: "absolute",
          right: "2rem",
          bottom: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <button onClick={() => dispatch(toggleMap())}>{isOnMap ? "Close map" : "Open map"}</button>
        <button onClick={() => setTextBoxStyle(textBoxStyle === "classic" ? "aside" : "classic")}>
          ({textBoxStyle === "classic" ? "Classic" : "Aside"})
        </button>
        {/* <button
          onClick={() => {
            dispatch(toggleBlackBars())
          }}
        >
          Black Bars
        </button> */}
      </div>

      <p>{displayUi.toString()}</p>

      {!isOnMap && (
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
      )}
      {textBoxStyle === "classic" && (
        <TextBox
          textBoxStyle={textBoxStyle}
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
      )}
      {textBoxStyle === "aside" && (
        <AsideTextBox
          textBoxStyle={textBoxStyle}
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
      )}
    </section>
  )
}
