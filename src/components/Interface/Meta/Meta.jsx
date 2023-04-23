import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import styles from "./Meta.module.scss"

export const Meta = ({
  sceneIndex,
  scriptData,
  showText,
  setShowText,
  setShowOptions,
  setIsVoiceOver,
  setSpotIndex,
  setTextIndex,
}) => {
  const { mapActive } = useSelector((state) => state.ui)
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
    if (!showText) {
      spotButtons.current.forEach((button) => {
        if (button) {
          if (button.classList.contains(styles.active)) {
            button.classList.remove(styles.active)
          }
        }
      })
    }
  }, [showText])

  useEffect(() => {
    setSpotIndex(0)
    setTextIndex(0)
    setShowText(false)
    setShowOptions(false)
  }, [mapActive])

  // Change the current spot and reset UI state
  const goToSpot = (data) => {
    setSpotIndex(data)
    setTextIndex(0)
    setIsVoiceOver(false)
    setShowText(true)
    setShowOptions(true)
  }

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
