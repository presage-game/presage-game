import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/Button/Button"
import { useDispatch } from "react-redux"
import { setScore } from "@/store/reducers/userReducer"

import "./Prompts.scss"

export const Prompts = ({ introduction, currentIndex, setCurrentIndex }) => {
  const dispatch = useDispatch()
  // const { score, scenario } = useSelector((state) => state.user)
  const TIPPING_POINT = Object.keys(introduction).length

  const [showFollowing, setShowFollowing] = useState(false)
  const [followingToShow, setFollowingToShow] = useState(null)
  const [isPromptComplete, setIsPromptComplete] = useState(false)
  // const [key, setKey] = useState(0)

  const answerPrompt = (data) => {
    dispatch(setScore(data))
  }

  // const completePrompts = (state) => {
  //   setIsPromptComplete(true)

  //   if (score <= TIPPING_POINT) {
  //     scenario = "1"
  //   } else {
  //     scenario = "2"
  //   }
  // }

  const goToNext = (data) => {
    setCurrentIndex(currentIndex + 1)
    setShowFollowing(false)
    answerPrompt(data)
  }

  const showFollowingText = (index) => {
    setFollowingToShow(index)
    setShowFollowing(true)

    // Play audio when user selects an option
    // TODO
  }

  return introduction.map((section, index) => {
    if (index !== currentIndex) {
      return null
    } else {
      return (
        <AnimatePresence key={index}>
          <div className="Prompts">
            {!showFollowing && (
              <div className="item item--prompt">
                <motion.div
                  className="baseline"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1 }}
                >
                  <span className="baseline__date">{section.date}</span>
                  <p className="baseline__content">{section.baseline}</p>
                </motion.div>
                <motion.div
                  key="options"
                  className="options"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1, delay: 2 }}
                >
                  {section.options.map((option, i) => {
                    return (
                      <Button
                        text={option.label}
                        key={i}
                        onClick={() => showFollowingText(i)}
                        variant="splashScreen"
                      />
                    )
                  })}
                </motion.div>
              </div>
            )}
            {showFollowing && (
              <div className="item item--following">
                <motion.div
                  key="following"
                  className="baseline"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1 }}
                >
                  <span className="baseline__date">{section.date}</span>
                  <p className="baseline__content">{section.options[followingToShow].following}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1, delay: 2 }}
                >
                  <button
                    className="next-button"
                    onClick={() => goToNext(section.options[followingToShow]?.version)}
                  >
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
                </motion.div>
              </div>
            )}
          </div>
        </AnimatePresence>
      )
    }
  })
}
