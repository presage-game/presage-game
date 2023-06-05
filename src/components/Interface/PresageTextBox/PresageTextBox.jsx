import { useState } from "react"
import { useDispatch } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/Button/Button"
import { toggleMap } from "@/store/reducers/uiReducer"

import "@/components/Interface/SceneTextBox/TextBox.scss"

export const PresageTextBox = ({ presagesData, mapActive, sceneIndex, spotIndex }) => {
  const [showText, setShowText] = useState(true)
  const [showOptions, setShowOptions] = useState(true)
  const [textIndex, setTextIndex] = useState(0)
  const [optionIndex, setOptionIndex] = useState(0)
  const [key, setKey] = useState(0)

  const dispatch = useDispatch()

  let data

  if (sceneIndex === 2) {
    data = presagesData[0]
  } else if (sceneIndex === 4) {
    data = presagesData[1]
  } else if (sceneIndex === 6) {
    data = presagesData[2]
  }

  const getTextLabel = () => {
    return data?.prompts[textIndex].label
  }

  const getText = () => {
    return data?.prompts[textIndex].text
  }

  const chooseResponse = (data) => {
    setOptionIndex(data)
    setShowOptions(false)
    setKey((prevKey) => prevKey + 1)
  }

  const getOptionResponse = () => {
    return data?.prompts[textIndex].options[optionIndex].response
  }

  const showMore = () => {
    setTextIndex(textIndex + 1)
    setShowOptions(true)
    setKey((prevKey) => prevKey + 1)
  }

  const hasMore = () => {
    return textIndex < data?.prompts.length - 1
  }

  return (
    <>
      {spotIndex !== null && showText && (
        <AnimatePresence>
          <motion.div
            key="textBox"
            className="TextBox TextBox--bottom"
            initial={{ opacity: 0, y: "-60%", x: "-50%" }}
            animate={{ opacity: 1, y: "-50%", x: "-50%" }}
            exit={{ opacity: 0, y: -20, y: "-60%", x: "-50%" }}
            transition={{ y: { type: "spring", stiffness: 100 } }}
          >
            <div className="TextBox__inner">
              <h2 className="narrator narrator--npc">{getTextLabel()}</h2>
              {showOptions && (
                <p className="content">
                  {getText()
                    .split(" ")
                    .map((word, index) => (
                      <motion.span
                        key={`${textIndex}-${index}-${key}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        {word}{" "}
                      </motion.span>
                    ))}
                </p>
              )}
              {!showOptions && (
                <p className="content">
                  {getOptionResponse()
                    .split(" ")
                    .map((word, index) => (
                      <motion.span
                        key={`${textIndex}-${index}-${key}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        {word}{" "}
                      </motion.span>
                    ))}
                </p>
              )}
            </div>
            {hasMore() && !showOptions && (
              <button className="next-button" onClick={showMore}>
                <svg
                  width="25"
                  height="13"
                  viewBox="0 0 25 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 6.50001L24 6.50001M24 6.50001L17 0.499999M24 6.50001L17 12.5"
                    stroke="#2E2724"
                  />
                </svg>
              </button>
            )}
            {!hasMore() && !showOptions && (
              <button
                className="close-button"
                onClick={() => {
                  setShowText(false)
                  dispatch(toggleMap())
                }}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 1L16 16M16 1L1 16" stroke="#2E2724" />
                </svg>
              </button>
            )}
            {showOptions && (
              <div className="TextBox__options">
                {data?.prompts[textIndex].options?.map((option, index) => (
                  <Button key={index} text={option.text} onClick={() => chooseResponse(index)} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  )
}
