import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { showPinpoint } from "@/store/reducers/mapReducer"
import { Button } from "@/components/Button/Button"

import "@/components/Interface/SceneTextBox/TextBox.scss"

export const MapTextBox = ({ pinpointsData, pinpointIndex, showText, setShowText }) => {
  const { isPinpointIntersecting, isPinpointActive } = useSelector((state) => state.map)

  const [showOptions, setShowOptions] = useState(pinpointIndex !== null)
  const [textIndex, setTextIndex] = useState(0)
  const [optionIndex, setOptionIndex] = useState(0)
  const [key, setKey] = useState(0)

  const dispatch = useDispatch()

  // TODO: Set this state from Supabase data
  const [variant, setVariant] = useState("a")

  const getTextEmitter = () => {
    const pinpoint = pinpointsData[pinpointIndex]?.voiceover[textIndex]

    if (typeof pinpoint?.text === "string") {
      return pinpoint?.emitter
    } else {
      if (variant === "a") {
        return pinpoint[0]?.emitter
      } else if (variant === "b") {
        return pinpoint[1]?.emitter
      }
    }
  }

  const getTextLabel = () =>
    pinpointsData[pinpointIndex]?.voiceover[textIndex]?.label
      ? pinpointsData[pinpointIndex]?.voiceover[textIndex]?.label
      : pinpointsData[pinpointIndex]?.name

  const getText = () => {
    const pinpoint = pinpointsData[pinpointIndex]?.voiceover[textIndex]

    if (typeof pinpoint?.text === "string") {
      return pinpoint?.text
    } else if (variant === "a" && pinpoint[0]?.text !== undefined) {
      return pinpoint[0]?.text
    } else if (variant === "b" && pinpoint[1]?.text !== undefined) {
      return pinpoint[1]?.text
    }
  }

  const getOptionResponse = () => {
    const pinpoint = pinpointsData[pinpointIndex]?.voiceover[textIndex]

    if (typeof pinpoint?.text === "string") {
      return pinpoint?.options[optionIndex]?.response
    } else {
      return pinpoint[variant === "a" ? 0 : 1]?.options[optionIndex]?.response
    }
  }

  const chooseResponse = (data) => {
    setOptionIndex(data)
    setShowOptions(false)
    setKey((prevKey) => prevKey + 1)
  }

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

  const hasOptions = () => {
    const pinpoint = pinpointsData[pinpointIndex]?.voiceover[textIndex]

    if (typeof pinpoint?.text === "string") {
      const options = pinpointsData[pinpointIndex]?.voiceover[textIndex]?.options
      return options?.length > 0
    } else if (variant) {
      const options =
        pinpointsData[pinpointIndex]?.voiceover[textIndex][variant === "a" ? 0 : 1]?.options
      return options?.length > 0
    }
  }

  useEffect(() => {
    if (pinpointIndex >= 0 && isPinpointActive) {
      setTextIndex(0)
      setOptionIndex(0)
      setShowText(true)
      setShowOptions(true)
    }
  }, [pinpointIndex, isPinpointActive])

  /* Voiceover */
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
    if (textIndex !== null && isPinpointActive) {
      const pinpoint = pinpointsData[pinpointIndex]?.voiceover[textIndex]
      let audioPath

      if (!variant || typeof pinpoint?.text === "string") {
        audioPath = `audios/pinpoints/${pinpointIndex}/voiceover/${textIndex}.mp3`
      } else {
        if (variant === "a" && typeof pinpoint === "object") {
          audioPath = `audios/pinpoints/${pinpointIndex}/voiceover/${textIndex}-a.mp3`
        } else if (variant === "b" && typeof pinpoint === "object") {
          audioPath = `audios/pinpoints/${pinpointIndex}/voiceover/${textIndex}-b.mp3`
        }
      }

      getAudioFile(audioPath).then((file) => {
        if (file) {
          setAudioFile(file)
        }
      })
    }
  }, [textIndex, pinpointIndex, isPinpointActive])

  // useEffect(() => {
  //   if (audioFile !== null && textIndex !== null && isPinpointActive) {
  //     if (!currentAudio.paused) {
  //       currentAudio.pause()
  //     }

  //     currentAudio.src = audioFile
  //     currentAudio.load()

  //     const playPromise = currentAudio.play()
  //     if (playPromise !== undefined) {
  //       playPromise.catch((error) => {
  //         return
  //       })
  //     }
  //   }

  //   return () => {
  //     currentAudio.currentTime = 0
  //     currentAudio.pause()
  //   }
  // }, [audioFile, textIndex])

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

  return (
    <AnimatePresence>
      {isPinpointActive && showText && isPinpointIntersecting && (
        <motion.div
          key="textBox"
          className="TextBox TextBox--bottom"
          initial={{ opacity: 0, y: "-60%", x: "-50%" }}
          animate={{ opacity: 1, y: "-50%", x: "-50%" }}
          exit={{ opacity: 0, y: "-60%", x: "-50%" }}
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
                      transition={{ duration: 0.6, delay: index * 0.1 }}
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
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      {word}{" "}
                    </motion.span>
                  ))}
              </p>
            )}
          </div>
          {hasOptions() && hasMore() && !showOptions && (
            <button className="next-button" onClick={showMoreNPC}>
              show more npc
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
          {!hasOptions() && hasMore() && (
            <button className="next-button" onClick={showMore}>
              show more
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
          {((showOptions && !hasOptions() && !hasMore()) ||
            (!showOptions && hasOptions() && !hasMore())) && (
            <button
              className="close-button"
              onClick={() => {
                setShowText(false)
                setShowOptions(false)
                dispatch(showPinpoint())
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
          {hasOptions() && showOptions && (
            <div className="TextBox__options">
              {pinpointsData[pinpointIndex]?.voiceover[textIndex]?.options?.map((option, index) => (
                <Button key={index} text={option.text} onClick={() => chooseResponse(index)} />
              ))}
            </div>
          )}
          {hasOptions() && showOptions && variant && (
            <div className="TextBox__options">
              {pinpointsData[pinpointIndex]?.voiceover[textIndex][
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
