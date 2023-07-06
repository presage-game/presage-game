import { useState, useEffect, useMemo, useRef } from "react"
import { useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { getTextVariant } from "@/helpers/variants/getTextVariant"

import { Button } from "@/components/Button/Button"

import "./TextBox.scss"

export const SceneTextBox = ({
  mapActive,
  sceneIndex,
  scriptData,
  spotIndex,
  showText,
  setShowText,
  isIntroActive,
  setIsIntroActive,
  OpenBlackBars,
}) => {
  const { infos } = useSelector((state) => state.game)
  const { adinkras } = useSelector((state) => state.user)
  const [showOptions, setShowOptions] = useState(false)
  const [textIndex, setTextIndex] = useState(0)
  const [optionIndex, setOptionIndex] = useState(0)
  const [key, setKey] = useState(0)

  const [variant, setVariant] = useState(() => getTextVariant(sceneIndex, "scene", infos, adinkras))

  /* Text */
  const getTextEmitter = () => {
    //
  }

  // Get label
  // const getTextLabel = () => {
  //   if (!isIntroActive) {
  //     const spot = scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]

  //     if (typeof spot?.text === "string") {
  //       return spot?.label
  //     } else {
  //       if (variant === "a" && spot[0] !== undefined) {
  //         return spot[0]?.label ? spot[0]?.label : null
  //       } else if (variant === "b" && spot[1] !== undefined) {
  //         return spot[1]?.label ? spot[1]?.label : null
  //       }
  //     }
  //   }
  // }

  // Get text
  // const getIntroText = () => {
  //   if (scriptData[sceneIndex]?.voiceover) {
  //     const intro = scriptData[sceneIndex]?.voiceover[textIndex]

  //     if (typeof intro?.text === "string") {
  //       return intro?.text
  //     } else {
  //       if (variant === "a" && intro[0]?.text !== undefined) {
  //         return intro[0]?.text ? intro[0]?.text : null
  //       } else if (variant === "b" && intro[1]?.text !== undefined) {
  //         return intro[1]?.text ? intro[1]?.text : null
  //       }
  //     }
  //   }
  //   return
  // }

  // const getSpotText = () => {
  //   const spot = scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]

  //   if (typeof spot?.text === "string") {
  //     return spot?.text
  //   } else {
  //     if (variant === "a" && typeof spot === "object") {
  //       return spot[0]?.text ? spot[0]?.text : null
  //     } else if (variant === "b" && typeof spot === "object") {
  //       return spot[1]?.text ? spot[1]?.text : null
  //     }
  //   }
  // }

  // const hasOptions = () => {
  //   const spot = scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]

  //   if (typeof spot?.text === "string") {
  //     const options = scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]?.options
  //     return options?.length > 0
  //   } else if (typeof spot?.text !== "string" && variant) {
  //     const options =
  //       scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex][variant === "a" ? 0 : 1]
  //         ?.options
  //     return options?.length > 0
  //   }

  //   return false
  // }

  // const hasMore = () => (isIntroActive ? hasMoreIntroText() : hasMoreSpotText())

  // const hasMoreIntroText = () => scriptData[sceneIndex]?.voiceover?.length > textIndex + 1

  // const hasMoreSpotText = () =>
  scriptData[sceneIndex].spots[spotIndex]?.spotVoiceover?.length > textIndex + 1

  // const showMore = () => {
  //   setTextIndex(textIndex + 1)
  //   setKey((prevKey) => prevKey + 1)
  // }

  // const showMoreNPC = () => {
  //   setTextIndex(textIndex + 1)
  //   setShowOptions(true)
  //   setKey((prevKey) => prevKey + 1)
  // }

  // const getOptionResponse = () => {
  //   const spot = scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]

  //   if (typeof spot?.text === "string") {
  //     return spot?.options[optionIndex]?.response
  //   } else {
  //     return spot[variant === "a" ? 0 : 1]?.options[optionIndex]?.response
  //   }
  // }

  // const chooseResponse = (data) => {
  //   setOptionIndex(data)
  //   setShowOptions(false)
  //   setKey((prevKey) => prevKey + 1)
  // }

  useEffect(() => {
    if (spotIndex !== null) {
      setTextIndex(0)
      setShowText(true)
      setIsIntroActive(false)
    } else if (spotIndex === null && !isIntroActive) {
      setTextIndex(0)
      setShowOptions(true)
    }
  }, [spotIndex])

  useEffect(() => {
    if (mapActive) {
      setTextIndex(0)
      setShowText(false)
      setShowOptions(false)
    } else {
      setShowText(true)
      setShowOptions(true)
    }
  }, [mapActive])

  useEffect(() => {
    if (!showText && spotIndex === null) {
      setTextIndex(0)
    }
  }, [showText])

  // useEffect(() => {
  //   if (!hasMoreIntroText()) {
  //     setIsIntroActive(false)
  //   }
  // }, [textIndex])

  useEffect(() => {
    if (spotIndex === null && !isIntroActive) {
      OpenBlackBars()
    }
  }, [spotIndex, isIntroActive])

  /* Voiceover */

  return (
    <AnimatePresence>
      {showText && (
        <motion.div
          key="textBox"
          className="TextBox TextBox--aside"
          initial={{ opacity: 0, y: "-50%", x: "-20%" }}
          animate={{ opacity: 1, y: "-50%", x: "0%" }}
          exit={{ opacity: 0, y: "-50%", x: "-20%" }}
          transition={{ x: { type: "spring", stiffness: 100 } }}
        >
          <div className="TextBox__inner">
            {/* {getTextEmitter() === "narrator" && <h2 className="narrator">Le narrateur</h2>}
            {getTextEmitter() === "innerVoice" && (
              <h2 className="narrator narrator--innerVoice">Voix de la radio</h2>
            )}
            {getTextEmitter() === "npc" && (
              <h2 className="narrator narrator--npc">{getTextLabel()}</h2>
            )} */}
            {/* {!isIntroActive && showOptions && getSpotText() && (
              <p className="content">
                {"bonjour".split(" ").map((word, index) => (
                  <motion.span
                    key={`${textIndex}-${spotIndex}-${index}-${key}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </p>
            )} */}
          </div>
          {/* {!hasOptions() && hasMore() && !showOptions && (
            <button className="next-button" onClick={showMoreNPC}>
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
          )} */}
          {/* {((!hasMore() && hasOptions() && !showOptions) ||
            (!hasOptions() && showOptions && !hasMore())) && (
            <button
              className="close-button"
              onClick={() => {
                setShowText(false)
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
          )} */}
          {/* {hasOptions() && showOptions && !variant && (
            <div className="TextBox__options--alternative">
              {scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]?.options.map(
                (option, index) => (
                  <Button text={option?.text} onClick={() => chooseResponse(index)} />
                )
              )}
            </div>
          )} */}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
