import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { resetPinpoint } from "@/store/reducers/userReducer"

import styles from "@/components/Interface/SceneTextBox/SceneTextBox.module.scss"

import pinpointsData from "@/assets/data/chapterOne/pinpoints.json"

export const MapTextBox = ({ mapActive }) => {
  const { pinpoint: pinpointIndex } = useSelector((state) => state.user)

  const [showText, setShowText] = useState(pinpointIndex !== null)
  const [showOptions, setShowOptions] = useState(pinpointIndex !== null)
  const [textIndex, setTextIndex] = useState(0)
  const [optionIndex, setOptionIndex] = useState(0)
  const [key, setKey] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!mapActive) {
      setShowText(false)
      setShowOptions(false)
      setTextIndex(0)

      dispatch(resetPinpoint())
    }
  }, [mapActive])

  const getTextEmitter = () => pinpointsData[pinpointIndex]?.voiceover[textIndex]?.emitter

  const getTextLabel = () => pinpointsData[pinpointIndex]?.name

  const getText = () => pinpointsData[pinpointIndex]?.voiceover[textIndex]?.text

  const getOptionResponse = () => {
    const option = pinpointsData[pinpointIndex]?.voiceover[textIndex]?.options[optionIndex]
    return option.response
  }

  const chooseResponse = (data) => {
    setOptionIndex(data)
    setShowOptions(false)
    setKey((prevKey) => prevKey + 1)
  }

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

  const hasMore = () => pinpointsData[pinpointIndex]?.voiceover?.length > textIndex + 1

  const hasOptions = () => pinpointsData[pinpointIndex]?.voiceover[textIndex]?.options?.length > 0

  useEffect(() => {
    if (pinpointIndex >= 0) {
      setTextIndex(0)
      setShowText(true)
      setShowOptions(true)
      setOptionIndex(0)
    }
  }, [pinpointIndex])

  return (
    <>
      <AnimatePresence>
        {showText && pinpointIndex !== null && pinpointIndex >= 0 && (
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
                <h2 className={[`${styles.narrator} ${styles["narrator--innerVoice"]}`]}>
                  Une voix
                </h2>
              )}
              {getTextEmitter() === "npc" && (
                <h2 className={[`${styles.narrator} ${styles["narrator--npc"]}`]}>
                  {getTextLabel()}
                </h2>
              )}
              {showOptions && (
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
              {hasOptions() && !showOptions && (
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
            {((showOptions && !hasOptions() && !hasMore()) ||
              (!hasMore() && !showOptions && hasOptions())) && (
              <button
                className={`${styles.bottomButton} ${styles["bottomButton--close"]}`}
                onClick={() => setShowText(false)}
              >
                Fermer
              </button>
            )}

            {hasOptions() && showOptions && (
              <div className={styles.options}>
                {pinpointsData[pinpointIndex]?.voiceover[textIndex]?.options?.map(
                  (option, index) => (
                    <button
                      key={index}
                      className={styles.optionsButton}
                      onClick={() => chooseResponse(index)}
                    >
                      {option.text}
                    </button>
                  )
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
