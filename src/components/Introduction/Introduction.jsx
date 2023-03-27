import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { answerPrompt, completePrompts } from "../../store/reducers/introductionReducer"
import { StartButton } from "../StartButton/StartButton"
import { Prompts } from "./Prompts/Prompts"
import introductionData from "../../assets/introduction.json"
import styles from "./Introduction.module.scss"
import ambiance from "../../assets/audios/introduction/ambiance.mp3"
import carEngine from "../../assets/audios/introduction/car-engine.mp3"

export const Introduction = () => {
  const dispatch = useDispatch()

  // Get introduction data from JSON file
  const introduction = introductionData

  // Redux selectors
  const { currentIndex, isPromptComplete, scenario, hasExperienceStarted } = useSelector(
    (state) => state.introduction
  )

  // Local state
  const [showIntroduction, setShowIntroduction] = useState(false)

  // Play audio when introduction starts
  useEffect(() => {
    if (showIntroduction) {
      const ambianceAudio = new Audio(ambiance)
      ambianceAudio.volume = 0.5

      const carAudio = new Audio(carEngine)
      carAudio.volume = 1

      ambianceAudio.play()
      carAudio.play()

      // Singleton pattern to avoid multiple instances of the same audio
      const audioSingleton = {
        ambianceAudio,
        carAudio,
      }

      return () => {
        audioSingleton.ambianceAudio.pause()
        audioSingleton.carAudio.pause()
      }
    }
  }, [showIntroduction])

  // Check if user has completed enough prompts to start the experience
  useEffect(() => {
    if (currentIndex > Object.keys(introductionData).length - 1) {
      dispatch(completePrompts())
    }
  }, [currentIndex])

  return (
    !hasExperienceStarted && (
      <section className={styles.container}>
        {!showIntroduction && (
          <div className={styles.splashScreen}>
            <h1 className={styles.title}>Projet "Anan Uua"</h1>
            <button
              className={styles.startButton}
              onClick={() => {
                setShowIntroduction(true)
              }}
            >
              Démarrer
            </button>
          </div>
        )}
        {showIntroduction && (
          <>
            <Prompts introduction={introduction} currentIndex={currentIndex} />
            {isPromptComplete && (
              <footer className={styles.footer}>
                <p style={{ marginTop: "2rem" }}>
                  [Début de l'expérience. Variante de scénario N°{scenario}].
                </p>
                <StartButton text={"Continuer"} />
              </footer>
            )}
          </>
        )}
      </section>
    )
  )
}
