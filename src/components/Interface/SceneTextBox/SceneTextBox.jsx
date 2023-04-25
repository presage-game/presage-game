import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import styles from "./SceneTextBox.module.scss"

export const SceneTextBox = ({ sceneIndex, scriptData, spotIndex }) => {
  const [showText, setShowText] = useState(false)
  const [isVoiceOver, setIsVoiceOver] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [textIndex, setTextIndex] = useState(0)
  const [optionIndex, setOptionIndex] = useState(0)
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (spotIndex !== undefined) {
      setTextIndex(0)
      setIsVoiceOver(false)
      setShowText(true)
      setShowOptions(true)
    }
  }, [spotIndex])

  const getTextEmitter = () =>
    !isVoiceOver
      ? scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]?.emitter
      : scriptData[sceneIndex]?.voiceover[textIndex]?.emitter

  const getTextLabel = () => (!isVoiceOver ? scriptData[sceneIndex].spots[spotIndex]?.label : null)

  const getIntroText = () =>
    scriptData[sceneIndex]?.voiceover && scriptData[sceneIndex]?.voiceover[textIndex]?.text

  const getSpotText = () => scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]?.text

  const hasMore = () => (isVoiceOver ? hasMoreIntroText() : hasMoreSpotText())

  const hasMoreIntroText = () => scriptData[sceneIndex]?.voiceover?.length > textIndex + 1

  const hasMoreSpotText = () =>
    scriptData[sceneIndex].spots[spotIndex]?.spotVoiceover?.length > textIndex + 1

  const hasOptions = () =>
    scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]?.options?.length > 0

  // Show the next text in the voiceover array
  const showMore = () => {
    setTextIndex(textIndex + 1)
    setKey((prevKey) => prevKey + 1)
  }

  const showMoreNPC = () => {
    setTextIndex(textIndex + 1)
    setShowOptions(true)
    setKey((prevKey) => prevKey + 1)
  }

  const getOptionResponse = () => {
    const option =
      scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]?.options[optionIndex]
    return option.response
  }

  const chooseResponse = (data) => {
    setOptionIndex(data)
    setShowOptions(false)
    setKey((prevKey) => prevKey + 1)
  }

  useEffect(() => {
    if (scriptData[sceneIndex].voiceover.length > 0) {
      setIsVoiceOver(true)
      setShowText(true)
    }
  }, [sceneIndex])

  return (
    <AnimatePresence>
      {showText && (
        <motion.div
          key="sceneTextBox"
          className={styles.aside}
          initial={{ opacity: 0, y: 0, x: "-20%" }}
          animate={{ opacity: 1, y: 0, x: "0%" }}
          exit={{ opacity: 0, y: 0, x: "-20%" }}
          transition={{ x: { type: "spring", stiffness: 100 } }}
        >
          <div>
            {getTextEmitter() === "narrator" && <h2 className={styles.narrator}>Le narrateur</h2>}
            {getTextEmitter() === "innerVoice" && (
              <h2 className={[`${styles.narrator} ${styles["narrator--innerVoice"]}`]}>Une voix</h2>
            )}
            {getTextEmitter() === "npc" && (
              <h2 className={[`${styles.narrator} ${styles["narrator--npc"]}`]}>
                {getTextLabel()}
              </h2>
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

            {!isVoiceOver && showOptions && (
              <p className={styles.content}>
                {getSpotText()
                  .split(" ")
                  .map((word, index) => (
                    <motion.span
                      key={`${textIndex}-${spotIndex}-${index}-${key}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.1 }}
                    >
                      {word}{" "}
                    </motion.span>
                  ))}
              </p>
            )}

            {hasOptions() && !isVoiceOver && !showOptions && (
              <p className={styles.content}>
                {getOptionResponse()
                  .split(" ")
                  .map((word, index) => (
                    <motion.span
                      key={`${textIndex}-${spotIndex}-${index}-${key}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.1 }}
                    >
                      {word}{" "}
                    </motion.span>
                  ))}
              </p>
            )}
          </div>
          {hasOptions() && hasMore() && !showOptions && (
            <button
              className={[`${styles.bottomButton} ${styles["bottomButton--more"]}`]}
              onClick={showMoreNPC}
            >
              Suite
            </button>
          )}
          {!hasOptions() && hasMore() && (
            <button
              className={[`${styles.bottomButton} ${styles["bottomButton--more"]}`]}
              onClick={showMore}
            >
              Suite
            </button>
          )}
          {!hasMore() && (
            <button
              className={[`${styles.bottomButton} ${styles["bottomButton--close"]}`]}
              onClick={() => setShowText(false)}
            >
              Fermer
            </button>
          )}
          {hasOptions() && showOptions && (
            <div className={styles.options}>
              {scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]?.options.map(
                (option, index) => (
                  <button
                    key={index}
                    className={styles.optionsButton}
                    onClick={() => chooseResponse(index)}
                  >
                    {option?.text}
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
