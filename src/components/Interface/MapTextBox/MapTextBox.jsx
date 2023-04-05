import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import styles from "@/components/Interface/SceneTextBox/SceneTextBox.module.scss"

export const MapTextBox = ({
  scriptData,
  pinpointIndex,
  displayUi,
  displayOptions,
  textIndex,
  setDisplayUi,
  setTextIndex,
  setDisplayOptions,
}) => {
  const [optionIndex, setOptionIndex] = useState(0)
  const [key, setKey] = useState(0)

  const getTextEmitter = () => scriptData[pinpointIndex].voiceover[textIndex].emitter

  const getTextLabel = () => scriptData[pinpointIndex].name

  const hasMore = () => scriptData[pinpointIndex].voiceover.length > textIndex + 1

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

  const getText = () => scriptData[pinpointIndex].voiceover[textIndex].text

  const getOptionResponse = () => {
    const option = scriptData[pinpointIndex].voiceover[textIndex].options[optionIndex]
    return option.response
  }

  const hasOptions = () => scriptData[pinpointIndex]?.voiceover[textIndex]?.options?.length > 0

  const chooseResponse = (data) => {
    setOptionIndex(data)
    setDisplayOptions(false)
    setKey((prevKey) => prevKey + 1)
  }

  return (
    <AnimatePresence>
      {displayUi && (
        <motion.div
          key="mapTextBox"
          className={styles.classic}
          initial={{ opacity: 0, y: 20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -20, x: "-50%" }}
          transition={{ y: { type: "spring", stiffness: 100 } }}
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

            {displayOptions && (
              <p className={styles.content}>
                {getText()
                  .split(" ")
                  .map((word, index) => (
                    <motion.span
                      key={`${textIndex}-${index}-${key}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.1 }}
                    >
                      {word}{" "}
                    </motion.span>
                  ))}
              </p>
            )}

            {hasOptions() && !displayOptions && (
              <p className={styles.content}>
                {getOptionResponse()
                  .split(" ")
                  .map((word, index) => (
                    <motion.span
                      key={`${textIndex}-${index}-${key}`}
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
          {hasOptions() && hasMore() && !displayOptions && (
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
          {((displayOptions && !hasOptions() && !hasMore()) ||
            (!hasMore() && !displayOptions && hasOptions())) && (
            <button
              className={`${styles.bottomButton} ${styles["bottomButton--close"]}`}
              onClick={() => setDisplayUi(false)}
            >
              Fermer
            </button>
          )}

          {hasOptions() && displayOptions && (
            <div className={styles.options}>
              {scriptData[pinpointIndex].voiceover[textIndex].options.map((option, index) => (
                <button
                  key={index}
                  className={styles.optionsButton}
                  onClick={() => chooseResponse(index)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
