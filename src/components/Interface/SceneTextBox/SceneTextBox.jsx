import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/Button/Button"

import "./TextBox.scss"

export const SceneTextBox = ({ mapActive, sceneIndex, scriptData, spotIndex }) => {
  const [showText, setShowText] = useState(false)
  const [isVoiceOver, setIsVoiceOver] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [textIndex, setTextIndex] = useState(0)
  const [optionIndex, setOptionIndex] = useState(0)
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (spotIndex !== null) {
      setTextIndex(0)
      setIsVoiceOver(false)
      setShowText(true)
      setShowOptions(true)
    }
  }, [spotIndex])

  useEffect(() => {
    setTextIndex(0)
    setShowText(false)
    setShowOptions(false)
  }, [mapActive])

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
      {showText && spotIndex !== null && (
        <motion.div
          key="textBox"
          className="TextBox TextBox--aside"
          initial={{ opacity: 0, y: "-50%", x: "-20%" }}
          animate={{ opacity: 1, y: "-50%", x: "0%" }}
          exit={{ opacity: 0, y: "-50%", x: "-20%" }}
          transition={{ x: { type: "spring", stiffness: 100 } }}
        >
          <div className="TextBox__inner">
            {getTextEmitter() === "narrator" && <h2 className="narrator">Le narrateur</h2>}
            {getTextEmitter() === "innerVoice" && (
              <h2 className="narrator narrator--innerVoice">Une voix</h2>
            )}
            {getTextEmitter() === "npc" && (
              <h2 className="narrator narrator--npc">{getTextLabel()}</h2>
            )}

            {isVoiceOver && (
              <p className="content">
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
              <p className="content">
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
              <p className="content">
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
          {hasOptions() && hasMore() && !showOptions && <Button text="Suite" onClick={showMore} />}
          {!hasOptions() && hasMore() && <Button text="Suite" onClick={showMoreNPC} />}
          {!hasMore() && (
            <Button
              text="Fermer"
              onClick={() => {
                setShowText(false)
              }}
            />
          )}
          {hasOptions() && showOptions && (
            <div className="options">
              {scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]?.options.map(
                (option, index) => (
                  <Button text={option?.text} onClick={() => chooseResponse(index)} />
                )
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
