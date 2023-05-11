import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { showPinpoint } from "@/store/reducers/mapReducer"
import { Button } from "@/components/Button/Button"

import "@/components/Interface/SceneTextBox/TextBox.scss"

export const MapTextBox = ({ pinpointsData, pinpointIndex, mapActive }) => {
  const { isPinpointIntersecting, isPinpointActive } = useSelector(
    (state) => state.map
  )

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
      setOptionIndex(0)
      setShowText(true)
      setShowOptions(true)
    }
  }, [pinpointIndex, isPinpointActive])

  return (
    <AnimatePresence>
      {isPinpointActive && showText && isPinpointIntersecting && (
        <motion.div
          key="textBox"
          className="TextBox TextBox--bottom"
          initial={{ opacity: 0, y: 20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -20, x: "-50%" }}
          transition={{ y: { type: "spring", stiffness: 100 } }}
        >
          <div className="TextBox__inner">
            {getTextEmitter() === "narrator" && <h2 className="narrator">Le narrateur</h2>}
            {getTextEmitter() === "innerVoice" && (
              <h2 className="narrator narrator--innerVoice">Voix de la radio</h2>
            )}
            {getTextEmitter() === "npc" && (
              <h2 className="narrator narrator--npc">{getTextLabel()}</h2>
            )}
            {showOptions && (
              <p className="content">
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
              <p className="content">
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
            <Button text="Suite" onClick={showMoreNPC} />
          )}
          {!hasOptions() && hasMore() && <Button text="Suite" onClick={showMore} />}
          {((showOptions && !hasOptions() && !hasMore()) ||
            (!hasMore() && !showOptions && hasOptions())) && (
            <Button
              text="Fermer"
              onClick={() => {
                setShowText(false)
                setTextIndex(0)
                setShowOptions(false)
                dispatch(showPinpoint())
              }}
            />
          )}
          {hasOptions() && showOptions && (
            <>
              {pinpointsData[pinpointIndex]?.voiceover[textIndex]?.options?.map((option, index) => (
                <Button
                  text={option.text}
                  onClick={() => chooseResponse(index)}
                  variant="splashScreen"
                />
              ))}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
