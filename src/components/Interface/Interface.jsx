import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toggleBlackBars, toggleIsOnMap } from "@/store/reducers/uiReducer"
import scriptData from "@/assets/chapterTwo.json"
import styles from "./Interface.module.scss"
import { BlackBars } from "@/components/BlackBars/BlackBars"
import { Meta } from "@/components/Interface/Meta/Meta"
import { TextBox } from "@/components/Interface/TextBox/TextBox"

export const Interface = () => {
  const dispatch = useDispatch()
  const { showBlackBars } = useSelector((state) => state.ui)

  const [displayUi, setDisplayUi] = useState(false)
  const [sceneIndex, setSceneIndex] = useState(0)
  const [isVoiceOver, setIsVoiceOver] = useState(false)
  const [displayOptions, setDisplayOptions] = useState(false)
  const [spotIndex, setSpotIndex] = useState(0)
  const [textIndex, setTextIndex] = useState(0)

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
      <TextBox
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
    </section>
  )
}
