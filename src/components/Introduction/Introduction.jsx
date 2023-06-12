import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import introductionData from "@/assets/data/introduction.json"
import ambiance from "/audios/introduction/ambiance.mp3"
import carEngine from "/audios/introduction/car-engine.mp3"

import { completePrompts } from "@/store/reducers/userReducer"
import { createGame } from "@/database/gamecode"

import { Prompts } from "./Prompts/Prompts"
import { SplashScreen } from "./SplashScreen/SplashScreen"
import { Footer } from "./Footer/Footer"

import "./Introduction.scss"
import { setCode, setInfos } from "@/store/reducers/gameReducer"

export const Introduction = () => {
  const introduction = introductionData

  const dispatch = useDispatch()
  const { isPromptComplete, hasExperienceStarted } = useSelector((state) => state.user)
  const { code } = useSelector((state) => state.game)

  const [currentIndex, setCurrentIndex] = useState(0)
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
    
    
    
    
    if (isPromptComplete && code === null) {
      async function fetchData() {
        const data = await createGame()
        
        dispatch(setCode(data.game_code))
        dispatch(setInfos(data.game_info))
      }
      fetchData()
    }
  }, [isPromptComplete])

  return (
    !hasExperienceStarted && (
      <section className="Introduction">
        {!showIntroduction && <SplashScreen setShowIntroduction={setShowIntroduction} />}
        {showIntroduction && (
          <>
            <Prompts
              introduction={introduction}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
            {isPromptComplete && <Footer />}
          </>
        )}
      </section>
    )
  )
}
