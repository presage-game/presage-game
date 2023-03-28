import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import styles from "./Meta.module.scss"

export const Meta = ({
  sceneIndex,
  scriptData,
  setDisplayUi,
  setDisplayOptions,
  setIsVoiceOver,
  setSceneIndex,
  setSpotIndex,
  setTextIndex,
}) => {
  const { showBlackBars } = useSelector((state) => state.ui)

  const buttons = useRef([])
  const spotButtons = useRef([])

  // Handle click on buttons
  const handleSceneSelect = (index) => {
    buttons.current.forEach((button, i) => {
      if (i === index) {
        button.classList.toggle(styles.active)
      } else {
        button.classList.remove(styles.active)
      }
    })

    spotButtons.current.forEach((button, i) => {
      if (button) {
        if (button.classList.contains(styles.active)) {
          button.classList.remove(styles.active)
        }
      }
    })
  }

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
    buttons.current[0].classList.add(styles.active)
  }, [])

  // Hide debug UI and text interface when black bars are active
  useEffect(() => {
    if (showBlackBars === true) {
      setDisplayUi(false)
      setDisplayOptions(false)

      spotButtons.current.forEach((button) => {
        if (button) {
          button.style.display = "none"
        }
      })
      buttons.current.forEach((button) => {
        if (button) {
          button.style.display = "none"
        }
      })
    } else {
      setDisplayUi(true)
      setDisplayOptions(true)

      spotButtons.current.forEach((button) => {
        if (button) {
          button.style.display = "inline"
        }
      })
      buttons.current.forEach((button) => {
        if (button) {
          button.style.display = "inline"
        }
      })
    }
  }, [showBlackBars])

  // Change the current scene and reset UI state
  const changeScene = (data) => {
    setSceneIndex(data)
    setSpotIndex(0)
    setTextIndex(0)
    setDisplayUi(false)
    setDisplayOptions(false)
  }

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
      <div className={styles.buttons}>
        {scriptData.map((scene, index) => (
          <button
            key={index}
            onClick={() => {
              handleSceneSelect(index)
              changeScene(index)
            }}
            ref={(el) => (buttons.current[index] = el)}
          >
            {scene.name}
          </button>
        ))}
      </div>
      <hr />
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
