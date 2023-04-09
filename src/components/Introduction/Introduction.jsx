import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { completePrompts } from "../../store/reducers/introductionReducer"
import { changeGameCode } from "@/store/reducers/userReducer"
import { createGame } from "@/database/gamecode"

import { Prompts } from "./Prompts/Prompts"
import { SplashScreen } from "./SplashScreen/SplashScreen"
import { Footer } from "./Footer/Footer"

import introductionData from "@/assets/data/introduction.json"

import styles from "./Introduction.module.scss"

import ambiance from "@/assets/audios/introduction/ambiance.mp3"
import carEngine from "@/assets/audios/introduction/car-engine.mp3"

import styles from "./Introduction.module.scss"

export const Introduction = () => {
  const introduction = introductionData

  const dispatch = useDispatch()
  const { currentIndex, isPromptComplete, hasExperienceStarted } = useSelector(
    (state) => state.introduction
  )
  const { gameCode } = useSelector((state) => state.user)

  const [showIntroduction, setShowIntroduction] = useState(false)

  // Play audio when introduction starts
  useEffect(() => {
    if (showIntroduction) {
      const ambianceAudio = new Audio(ambiance)
      ambianceAudio.volume = 1

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

  useEffect(() => {
    if (isPromptComplete && gameCode === null) {
      async function fetchData() {
        const data = await createGame()
        dispatch(changeGameCode(data.game_code))
      }
      fetchData()
    }
  }, [isPromptComplete])

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
