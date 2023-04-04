import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import styles from "./Meta.module.scss"

export const Meta = ({
  sceneIndex,
  scriptData,
  displayUi,
  setDisplayUi,
  setDisplayOptions,
  setIsVoiceOver,
  setSpotIndex,
  setTextIndex,
}) => {
  const { isOnMap } = useSelector((state) => state.ui)
  const spotButtons = useRef([])

  const handleSpotSelect = (index) => {
    spotButtons.current.forEach((button, i) => {
      if (button) {
        if (i === index) {
          button.classList.toggle(styles.active)
        } else {
          if (button.classList.contains(styles.active)) {
            button.classList.remove(styles.active)
          }
        }
      }
    })
  }

  useEffect(() => {
    if (!displayUi) {
      spotButtons.current.forEach((button) => {
        if (button) {
          if (button.classList.contains(styles.active)) {
            button.classList.remove(styles.active)
          }
        }
      })
    }
  }, [displayUi])

  useEffect(() => {
    setSpotIndex(0)
    setTextIndex(0)
    setDisplayUi(false)
    setDisplayOptions(false)
  }, [isOnMap])

  // Change the current spot and reset UI state
  const goToSpot = (data) => {
    setSpotIndex(data)
    setTextIndex(0)
    setIsVoiceOver(false)
    setDisplayUi(true)
    setDisplayOptions(true)
  }

  useEffect(() => {
    if (scriptData[sceneIndex].voiceover.length > 0) {
      setIsVoiceOver(true)
      setDisplayUi(true)
    }
  }, [sceneIndex])

  return (
    <div className={styles.root}>
      <div className={styles.spots}>
        {scriptData[sceneIndex].spots.map((spot, index) => (
          <button
            key={index}
            ref={(el) => (spotButtons.current[index] = el)}
            onClick={() => {
              handleSpotSelect(index)
              goToSpot(index)
            }}
          >
            {spot.label}
          </button>
        ))}
      </div>
    </div>
  )
}
