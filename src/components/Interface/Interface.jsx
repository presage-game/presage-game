import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toggleBlackBars, toggleIsOnMap } from "@/store/reducers/uiReducer"
import scriptData from "@/assets/chapterTwo.json"
import styles from "./Interface.module.scss"
import { BlackBars } from "@/components/BlackBars/BlackBars"
import { Meta } from "@/components/Interface/Meta/Meta"
import { TextBox } from "@/components/Interface/TextBox/TextBox"
import { AsideTextBox } from "@/components/Interface/AsideTextBox/AsideTextBox"

export const Interface = () => {
  const dispatch = useDispatch()
  const { showBlackBars } = useSelector((state) => state.ui)

  const [displayUi, setDisplayUi] = useState(false)
  const [sceneIndex, setSceneIndex] = useState(0)
  const [isVoiceOver, setIsVoiceOver] = useState(false)
  const [displayOptions, setDisplayOptions] = useState(false)
  const [spotIndex, setSpotIndex] = useState(0)
  const [textIndex, setTextIndex] = useState(0)

  const [textBoxStyle, setTextBoxStyle] = useState("classic")

  return (
    <section className={styles.root}>
      {showBlackBars && <BlackBars />}
      {/* <button
        className={styles.test}
        onClick={() => {
          dispatch(toggleBlackBars())
        }}
      >
        Toggle black bars ({showBlackBars.toString()})
      </button> */}
      <button
        style={{ position: "absolute", right: "2rem", bottom: "2rem" }}
        onClick={() => setTextBoxStyle(textBoxStyle === "classic" ? "aside" : "classic")}
      >
        Change TextBox ({textBoxStyle})
      </button>
      <Meta
        sceneIndex={sceneIndex}
        scriptData={scriptData}
        setDisplayUi={setDisplayUi}
        setDisplayOptions={setDisplayOptions}
        setIsVoiceOver={setIsVoiceOver}
        setSceneIndex={setSceneIndex}
        setSpotIndex={setSpotIndex}
        setTextIndex={setTextIndex}
      />
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
