import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import { motion, AnimatePresence } from "framer-motion"

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
}) => {
  const [introPlayed, setIntroPlayed] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [textIndex, setTextIndex] = useState(0)
  const [optionIndex, setOptionIndex] = useState(0)
  const [key, setKey] = useState(0)

  // TODO: Set this state from Supabase data
  const [variant, setVariant] = useState("b")

  /* Text and options */
  const getTextEmitter = () => {
    if (!isVoiceOver) {
      const spot = scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]

      if (!variant || typeof spot?.text === "string") {
        return spot?.emitter
      }

      if (variant === "a" && spot[0]?.emitter !== undefined) {
        return spot[0]?.emitter
      }

      if (variant === "b" && spot[1]?.emitter !== undefined) {
        return spot[1]?.emitter
      }
    } else {
      const intro = scriptData[sceneIndex]?.voiceover[textIndex]

      if (!variant || typeof intro?.text === "string") {
        return intro?.emitter
      }

      if (variant === "a" && intro[0]?.emitter !== undefined) {
        return intro[0]?.emitter
      }

      if (variant === "b" && intro[1]?.emitter !== undefined) {
        return intro[1]?.emitter
      }
    }
  }

  // Get label
  const getTextLabel = () => (!isVoiceOver ? scriptData[sceneIndex].spots[spotIndex]?.label : null)

  // Get text
  const getIntroText = () => {
    if (scriptData[sceneIndex]?.voiceover) {
      const intro = scriptData[sceneIndex]?.voiceover[textIndex]

      if (!variant || typeof intro?.text === "string") {
        return intro?.text
      } else {
        if (variant === "a" && intro[0]?.text !== undefined) {
          return intro[0]?.text
        } else if (variant === "b" && intro[1]?.text !== undefined) {
          return intro[1]?.text
        }
      }

      return
    }
  }

  const getSpotText = () => {
    const spot = scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]

    if (!variant || typeof spot?.text === "string") {
      return spot?.text
    } else {
      if (variant === "a" && typeof spot === "object") {
        return spot[0]?.text ? spot[0]?.text : null
      } else if (variant === "b" && typeof spot === "object") {
        return spot[1]?.text ? spot[1]?.text : null
      }
    }
  }

  // Get options
  const hasMore = () => (isVoiceOver ? hasMoreIntroText() : hasMoreSpotText())

  const hasMoreIntroText = () => scriptData[sceneIndex]?.voiceover?.length > textIndex + 1

  const hasMoreSpotText = () =>
    scriptData[sceneIndex].spots[spotIndex]?.spotVoiceover?.length > textIndex + 1

  const hasOptions = () =>
    scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]?.options?.length > 0

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
    if (spotIndex !== null) {
      setTextIndex(0)
      setIsVoiceOver(false)
      setShowText(true)
      setShowOptions(true)
    } else if (spotIndex === null && introPlayed) {
      setTextIndex(null)
    }
  }, [spotIndex])

  useEffect(() => {
    setTextIndex(0)
    setShowText(false)
    setShowOptions(false)
  }, [mapActive])

  useEffect(() => {
    if (scriptData[sceneIndex].voiceover.length > 0) {
      setIsVoiceOver(true)
      setShowText(true)
    }
  }, [sceneIndex])

  /* Voiceover */
  useEffect(() => {
    if (!hasMoreIntroText()) {
      setIntroPlayed(true)
      console.log("debug")
    }
  }, [textIndex])

  const { isMuted, volume } = useSelector((state) => state.audio)

  const currentAudio = new Audio()
  currentAudio.volume = 0.75 * volume

  useEffect(() => {
    currentAudio.muted = isMuted
    currentAudio.volume = 0.75 * volume
  }, [isMuted])

  const getAudioFile = (filePath) =>
    fetch(filePath, { method: "HEAD" })
      .then((response) => (response.ok ? filePath : null))
      .catch(() => null)

  const [audioFile, setAudioFile] = useState(null)

  useEffect(() => {
    if (spotIndex === null && !introPlayed && getIntroText()) {
      getAudioFile(`audios/scenes/${sceneIndex}/voiceover/intro-${textIndex}.mp3`).then((file) => {
        if (file) {
          setAudioFile(file)
        }
      })
    } else if (spotIndex !== null && getSpotText()) {
      getAudioFile(`audios/scenes/${sceneIndex}/voiceover/${spotIndex}-${textIndex}.mp3`).then(
        (file) => {
          if (file) {
            setAudioFile(file)
          }
        }
      )
    }
  }, [spotIndex, textIndex, sceneIndex, introPlayed])

  useEffect(() => {
    if (audioFile !== null && textIndex !== null) {
      if (!currentAudio.paused) {
        currentAudio.pause()
      }

      currentAudio.src = audioFile
      currentAudio.load()

      const playPromise = currentAudio.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          return // TODO: catch the error, and show a message only if the error is not related to a missing file
        })
      }
    }

    return () => {
      currentAudio.currentTime = 0
      currentAudio.pause()
    }
  }, [audioFile, textIndex])

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
                      transition={{ duration: 0.6, delay: index * 0.15 }}
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
                      transition={{ duration: 0.6, delay: index * 0.15 }}
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
                      transition={{ duration: 0.6, delay: index * 0.15 }}
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
