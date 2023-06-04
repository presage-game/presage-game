import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { toggleBlackBars } from "@/store/reducers/uiReducer"
import { Button } from "@/components/Button/Button"

import { motion, AnimatePresence } from "framer-motion"

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
  const [textIndex, setTextIndex] = useState(0)
  const [key, setKey] = useState(0)

  // TODO: Set this state from Supabase data
  const [variant, setVariant] = useState("b")

  /* Text */
  const getTextEmitter = () => {
    if (!isVoiceOver) {
      const spot = scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]

      if (!variant || typeof spot?.text === "string") {
        return spot?.emitter
      } else {
        if (variant === "a" && spot[0]?.emitter !== undefined) {
          return spot[0]?.emitter
        } else if (variant === "b" && spot[1]?.emitter !== undefined) {
          return spot[1]?.emitter
        }
      }

      return
    } else {
      const intro = scriptData[sceneIndex]?.voiceover[textIndex]

      if (!variant || typeof intro?.text === "string") {
        return intro?.emitter
      } else {
        if (variant === "a" && intro[0]?.emitter !== undefined) {
          return intro[0]?.emitter
        } else if (variant === "b" && intro[1]?.emitter !== undefined) {
          return intro[1]?.emitter
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

      if (!variant || typeof intro?.text === "string") {
        return intro?.text
      } else {
        if (variant === "a" && intro[0]?.text !== undefined) {
          return intro[0]?.text
        } else if (variant === "b" && intro[1]?.text !== undefined) {
          return intro[1]?.text
        }
      }
    }
    return
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

  const hasMore = () => (isVoiceOver ? hasMoreIntroText() : hasMoreSpotText())

  const hasMoreIntroText = () => scriptData[sceneIndex]?.voiceover?.length > textIndex + 1

  const hasMoreSpotText = () =>
    scriptData[sceneIndex].spots[spotIndex]?.spotVoiceover?.length > textIndex + 1

  const showMore = () => {
    setTextIndex(textIndex + 1)
    setKey((prevKey) => prevKey + 1)
  }

  useEffect(() => {
    if (spotIndex !== null) {
      setTextIndex(0)
      setShowText(true)
      setIntroPlayed(true)
      setIsVoiceOver(false)
    } else if (spotIndex === null && introPlayed) {
      setTextIndex(null)
    }
  }, [spotIndex])

  useEffect(() => {
    if (mapActive) {
      setTextIndex(0)
      setShowText(false)
    } else {
      setIsVoiceOver(true)
      setShowText(true)
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

      if (!variant || typeof intro?.text === "string") {
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

      if (!variant || typeof spot?.text === "string") {
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
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      {word}{" "}
                    </motion.span>
                  ))}
              </p>
            )}
            {!isVoiceOver && getSpotText() && (
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
          </div>
          {hasMore() && (
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
          {!hasMore() && (
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}
