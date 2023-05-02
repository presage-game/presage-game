import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/Button/Button"
import styles from "./Prompts.module.scss"
import { useDispatch } from "react-redux"
import { setScore } from "@/store/reducers/userReducer"

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
        <AnimatePresence>
          <div className={styles.root} key={index}>
            {!showFollowing && (
              <>
                <motion.div
                  className={styles.baseline}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1 }}
                >
                  <span className={styles.date}>{section.date}</span>
                  <p>{section.baseline}</p>
                </motion.div>
                <motion.div
                  key="options"
                  className={styles.options}
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
              </>
            )}
            {showFollowing && (
              <>
                <motion.div
                  key="following"
                  className={`${styles.baseline} ${true && styles.active}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1 }}
                >
                  <span className={styles.date}>{section.date}</span>
                  <p>{section.options[followingToShow].following}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1, delay: 2 }}
                >
                  <Button
                    text="Continuer"
                    onClick={() => goToNext(section.options[followingToShow]?.version)}
                  />
                </motion.div>
              </>
            )}
          </div>
        </AnimatePresence>
      )
    }
  })
}
