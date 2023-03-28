import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import styles from "./TextBox.module.scss"

export const TextBox = ({
  sceneIndex,
  scriptData,
  isVoiceOver,
  displayOptions,
  spotIndex,
  textIndex,
  displayUi,
  setTextIndex,
  setDisplayOptions,
  setDisplayUi,
}) => {
  const [optionIndex, setOptionIndex] = useState(0)
  const [key, setKey] = useState(0)

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
    setKey((prevKey) => prevKey + 1)
  }

  const showMoreNPC = () => {
    setTextIndex(textIndex + 1)
    setDisplayOptions(true)
    setKey((prevKey) => prevKey + 1)
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
    setKey((prevKey) => prevKey + 1)
  }

  // const spring = {
  //   type: "spring",
  //   damping: 10,
  //   stiffness: 1000,
  // }

  return (
    <AnimatePresence>
      {displayUi && (
        <motion.div
          key="textBox"
          className={styles.root}
          initial={{ opacity: 0, y: "-20%", x: "-50%" }}
          animate={{ opacity: 1, y: "0%", x: "-50%" }}
          exit={{ opacity: 0, y: "-20%", x: "-50%" }}
          transition={{ y: { type: "spring", stiffness: 100 } }}
        >
          {getTextEmitter() === "narrator" && <h2 className={styles.narrator}>Le narrateur</h2>}
          {getTextEmitter() === "innerVoice" && (
            <h2 className={[`${styles.narrator} ${styles["narrator--innerVoice"]}`]}>Une voix</h2>
          )}
          {getTextEmitter() === "npc" && (
            <h2 className={[`${styles.narrator} ${styles["narrator--npc"]}`]}>{getTextLabel()}</h2>
          )}

          {isVoiceOver && (
            <p className={styles.content}>
              {getIntroText()
                .split(" ")
                .map((word, index) => (
                  <motion.span
                    key={`${textIndex}-${spotIndex}-${index}-${key}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, delay: index * 0.1 }}
                  >
                    {word}{" "}
                  </motion.span>
                ))}
            </p>
          )}

          {!isVoiceOver && displayOptions && (
            <p className={styles.content}>
              {getSpotText()
                .split(" ")
                .map((word, index) => (
                  <motion.span
                    key={`${textIndex}-${spotIndex}-${index}-${key}`}
                    initial={{ opacity: 0, y: 20, rotate: 36 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.1 }}
                  >
                    {word}{" "}
                  </motion.span>
                ))}
            </p>
          )}

          {hasOptions() && !isVoiceOver && !displayOptions && (
            <p className={styles.content}>
              {getOptionResponse()
                .split(" ")
                .map((word, index) => (
                  <motion.span
                    key={`${textIndex}-${spotIndex}-${index}-${key}`}
                    initial={{ opacity: 0, y: 20, rotate: 36 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.1 }}
                  >
                    {word}{" "}
                  </motion.span>
                ))}
            </p>
          )}
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}
