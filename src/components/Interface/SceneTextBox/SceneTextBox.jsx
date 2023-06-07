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
  isVoiceOver,
  setIsVoiceOver,
  OpenBlackBars,
}) => {
  const { code, infos } = useSelector((state) => state.game)
  const { adinkras } = useSelector((state) => state.user)
  const [introPlayed, setIntroPlayed] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [textIndex, setTextIndex] = useState(0)
  const [optionIndex, setOptionIndex] = useState(0)
  const [key, setKey] = useState(0)

  /* --- WIP --- */

  // Utiliser un useMemo? Ou une fonction dédiée?
  const [variant, setVariant] = useState(() => getTextVariant(sceneIndex, "scene", infos, adinkras))

  /* ------ */

  /* Text */
  const getTextEmitter = () => {
    if (!isVoiceOver) {
      const spot = scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]

      if (typeof spot?.text === "string") {
        return spot?.emitter
      } else {
        if (variant === "a" && spot[0] !== undefined) {
          return spot[0]?.emitter ? spot[0]?.emitter : null
        } else if (variant === "b" && spot[1] !== undefined) {
          return spot[1]?.emitter ? spot[1]?.emitter : null
        }
      }
    } else {
      const intro = scriptData[sceneIndex]?.voiceover[textIndex]

      if (typeof intro?.text === "string") {
        return intro?.emitter
      } else {
        if (variant === "a" && intro[0] !== undefined) {
          return intro[0]?.emitter ? intro[0]?.emitter : null
        } else if (variant === "b" && intro[1] !== undefined) {
          return intro[1]?.emitter ? intro[1]?.emitter : null
        }
      }
    }
  }

  // Get label
  const getTextLabel = () => (!isVoiceOver ? scriptData[sceneIndex].spots[spotIndex]?.label : null)

  // Get text
  const getIntroText = () => {
    if (scriptData[sceneIndex]?.voiceover) {
      const intro = scriptData[sceneIndex]?.voiceover[textIndex]

      if (typeof intro?.text === "string") {
        return intro?.text
      } else {
        if (variant === "a" && intro[0]?.text !== undefined) {
          return intro[0]?.text ? intro[0]?.text : null
        } else if (variant === "b" && intro[1]?.text !== undefined) {
          return intro[1]?.text ? intro[1]?.text : null
        }
      }
    }
    return
  }

  const getSpotText = () => {
    const spot = scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]

    if (typeof spot?.text === "string") {
      return spot?.text
    } else {
      if (variant === "a" && typeof spot === "object") {
        return spot[0]?.text ? spot[0]?.text : null
      } else if (variant === "b" && typeof spot === "object") {
        return spot[1]?.text ? spot[1]?.text : null
      }
    }
  }

  const hasOptions = () => {
    const spot = scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]

    if (typeof spot?.text === "string") {
      const options = scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]?.options
      return options?.length > 0
    } else if (typeof spot?.text !== "string" && variant) {
      const options =
        scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex][variant === "a" ? 0 : 1]
          ?.options
      return options?.length > 0
    }

    return false
  }

  const hasMore = () => (isVoiceOver ? hasMoreIntroText() : hasMoreSpotText())

  const hasMoreIntroText = () => scriptData[sceneIndex]?.voiceover?.length > textIndex + 1

  const hasMoreSpotText = () =>
    scriptData[sceneIndex].spots[spotIndex]?.spotVoiceover?.length > textIndex + 1

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
    const spot = scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]

    if (typeof spot?.text === "string") {
      return spot?.options[optionIndex]?.response
    } else {
      return spot[variant === "a" ? 0 : 1]?.options[optionIndex]?.response
    }
  }

  const chooseResponse = (data) => {
    setOptionIndex(data)
    setShowOptions(false)
    setKey((prevKey) => prevKey + 1)
  }

  useEffect(() => {
    if (spotIndex !== null) {
      setTextIndex(0)
      setShowText(true)
      setIntroPlayed(true)
      setIsVoiceOver(false)
    } else if (spotIndex === null && introPlayed) {
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

  /* Voiceover */
  useEffect(() => {
    if (!hasMoreIntroText()) {
      setIntroPlayed(true)
    }
  }, [textIndex])

  const { isMuted } = useSelector((state) => state.audio)

  const currentAudio = new Audio()
  currentAudio.volume = 0.75

  useEffect(() => {
    currentAudio.muted = isMuted
  }, [isMuted])

  const getAudioFile = (filePath) =>
    fetch(filePath, { method: "HEAD" })
      .then((response) => (response.ok ? filePath : null))
      .catch(() => null)

  const [audioFile, setAudioFile] = useState(null)

  useEffect(() => {
    if (spotIndex === null && !introPlayed && getIntroText()) {
      const intro = scriptData[sceneIndex]?.voiceover[textIndex]
      let audioPath

      if (typeof intro?.text === "string") {
        audioPath = `audios/scenes/${sceneIndex}/voiceover/intro-${textIndex}.mp3`
      } else {
        if (variant === "a" && intro[0]?.text !== undefined) {
          audioPath = `audios/scenes/${sceneIndex}/voiceover/intro-${textIndex}-a.mp3`
        } else if (variant === "b" && intro[1]?.text !== undefined) {
          audioPath = `audios/scenes/${sceneIndex}/voiceover/intro-${textIndex}-b.mp3`
        }
      }

      getAudioFile(audioPath).then((file) => {
        if (file) {
          setAudioFile(file)
        }
      })
    } else if (spotIndex !== null && getSpotText()) {
      const spot = scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]
      let audioPath

      if (typeof spot?.text === "string") {
        audioPath = `audios/scenes/${sceneIndex}/voiceover/${spotIndex}-${textIndex}.mp3`
      } else {
        if (variant === "a" && typeof spot === "object") {
          audioPath = `audios/scenes/${sceneIndex}/voiceover/${spotIndex}-${textIndex}-a.mp3`
        } else if (variant === "b" && typeof spot === "object") {
          audioPath = `audios/scenes/${sceneIndex}/voiceover/${spotIndex}-${textIndex}-b.mp3`
        }
      }

      getAudioFile(audioPath).then((file) => {
        if (file) {
          setAudioFile(file)
        }
      })
    }
  }, [spotIndex, textIndex, introPlayed]) // Improve?

  useEffect(() => {
    if (audioFile) {
      currentAudio.src = audioFile
      currentAudio.play()
    } else {
      currentAudio.pause()
    }

    return () => {
      currentAudio.pause()
      currentAudio.src = ""
      currentAudio.currentTime = 0
    }
  }, [audioFile])

  useEffect(() => {
    if (introPlayed) {
      OpenBlackBars()
    }
  }, [introPlayed])

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
            {getTextEmitter() === "narrator" && <h2 className="narrator">Le narrateur</h2>}
            {getTextEmitter() === "innerVoice" && (
              <h2 className="narrator narrator--innerVoice">Voix de la radio</h2>
            )}
            {getTextEmitter() === "npc" && (
              <h2 className="narrator narrator--npc">{getTextLabel()}</h2>
            )}
            {isVoiceOver && getIntroText() && (
              <p className="content">
                {getIntroText()
                  .split(" ")
                  .map((word, index) => (
                    <motion.span
                      key={`${textIndex}-${spotIndex}-${index}-${key}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      {word}{" "}
                    </motion.span>
                  ))}
              </p>
            )}
            {!isVoiceOver && showOptions && getSpotText() && (
              <p className="content">
                {getSpotText()
                  .split(" ")
                  .map((word, index) => (
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
            )}
            {hasOptions() && !isVoiceOver && !showOptions && getOptionResponse() && (
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
          {hasMore() && showOptions && (
            <button className="next-button" onClick={showMore}>
              {/* show more */}
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
          {!hasOptions() && hasMore() && !showOptions && (
            <button className="next-button" onClick={showMoreNPC}>
              {/* show more npc */}
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
          {((!hasMore() && hasOptions() && !showOptions) ||
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
          )}
          {hasOptions() && showOptions && !variant && (
            <div className="TextBox__options--alternative">
              {scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]?.options.map(
                (option, index) => (
                  <Button text={option?.text} onClick={() => chooseResponse(index)} />
                )
              )}
            </div>
          )}
          {hasOptions() && showOptions && variant && (
            <div className="TextBox__options--alternative">
              {scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex][
                variant === "a" ? 0 : 1
              ]?.options?.map((option, index) => (
                <Button key={index} text={option.text} onClick={() => chooseResponse(index)} />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
