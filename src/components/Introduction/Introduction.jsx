import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { completePrompts } from "../../store/reducers/introductionReducer"
import { Prompts } from "./Prompts/Prompts"
import { SplashScreen } from "./SplashScreen/SplashScreen"
import { Footer } from "./Footer/Footer"
import introductionData from "../../assets/introduction.json"
import styles from "./Introduction.module.scss"
import ambiance from "../../assets/audios/introduction/ambiance.mp3"
import carEngine from "../../assets/audios/introduction/car-engine.mp3"

export const Introduction = () => {
  const introduction = introductionData

  const dispatch = useDispatch()
  const { currentIndex, isPromptComplete, hasExperienceStarted } = useSelector(
    (state) => state.introduction
  )

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
      <section className={styles.root}>
        {!showIntroduction && <SplashScreen setShowIntroduction={setShowIntroduction} />}
        {showIntroduction && (
          <>
            <Prompts introduction={introduction} currentIndex={currentIndex} />
            {isPromptComplete && <Footer />}
          </>
        )}
      </section>
    )
  )
}
