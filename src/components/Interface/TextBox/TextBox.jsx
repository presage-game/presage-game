import { useState } from "react"
import styles from "./TextBox.module.scss"

export const TextBox = ({
  sceneIndex,
  scriptData,
  isVoiceOver,
  displayOptions,
  spotIndex,
  textIndex,
  setTextIndex,
  setDisplayOptions,
  setDisplayUi
}) => {
  const [optionIndex, setOptionIndex] = useState(0)

  const getTextEmitter = () =>
    !isVoiceOver
      ? scriptData[sceneIndex].spots[spotIndex].spotVoiceover[textIndex].emitter
      : scriptData[sceneIndex].voiceover[textIndex].emitter

  const getTextLabel = () => (!isVoiceOver ? scriptData[sceneIndex].spots[spotIndex].label : null)

  const hasMore = () => (isVoiceOver ? hasMoreIntroText() : hasMoreSpotText())

  const getIntroText = () =>
    scriptData[sceneIndex].voiceover && scriptData[sceneIndex].voiceover[textIndex].text

  // Show the next text in the voiceover array
  const showMore = () => {
    setTextIndex(textIndex + 1)
  }

  const showMoreNPC = () => {
    setTextIndex(textIndex + 1)
    setDisplayOptions(true)
  }

  const hasMoreIntroText = () => scriptData[sceneIndex].voiceover.length > textIndex + 1

  const getSpotText = () => scriptData[sceneIndex].spots[spotIndex].spotVoiceover[textIndex].text

  const getOptionResponse = () => {
    const option =
      scriptData[sceneIndex].spots[spotIndex].spotVoiceover[textIndex].options[optionIndex]
    return option.response
  }

  const hasMoreSpotText = () =>
    scriptData[sceneIndex].spots[spotIndex].spotVoiceover.length > textIndex + 1

  const hasOptions = () =>
    scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]?.options?.length > 0

  const chooseResponse = (data) => {
    setOptionIndex(data)
    setDisplayOptions(false)
  }

  return (
    <div className={styles.root}>
      <div className={styles.emitter}>
        {getTextEmitter() === "narrator" && <h2 className={styles.narrator}>Le narrateur</h2>}
        {getTextEmitter() === "innerVoice" && (
          <h2 className={[`${styles.narrator} ${styles["narrator--innerVoice"]}`]}>Une voix</h2>
        )}
        {getTextEmitter() === "npc" && (
          <h2 className={[`${styles.narrator} ${styles["narrator--npc"]}`]}>{getTextLabel()}</h2>
        )}
      </div>
      <div className={styles.content}>
        {isVoiceOver && <p>{getIntroText()}</p>}
        {!isVoiceOver && displayOptions && <p>{getSpotText()}</p>}
        {hasOptions() && !isVoiceOver && !displayOptions && <p>{getOptionResponse()}</p>}
        {hasOptions() && hasMore() && !displayOptions && (
          <button className={styles.more} onClick={showMoreNPC}>
            Suite...
          </button>
        )}
        {!hasOptions() && hasMore() && (
          <button className={styles.more} onClick={showMore}>
            Suite...
          </button>
        )}
        {!hasMore() && (
          <button className={styles.more} onClick={() => setDisplayUi(false)}>
            Fermer.
          </button>
        )}
        {hasOptions() && displayOptions && (
          <div className={styles.options}>
            {scriptData[sceneIndex].spots[spotIndex].spotVoiceover[textIndex].options.map(
              (option, index) => (
                <button key={index} onClick={() => chooseResponse(index)}>
                  {option.text}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}
