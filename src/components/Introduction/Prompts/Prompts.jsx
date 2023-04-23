import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { answerPrompt } from "@/store/reducers/introductionReducer"
import { motion, AnimatePresence } from "framer-motion"
import styles from "./Prompts.module.scss"

export const Prompts = ({ introduction, currentIndex, setCurrentIndex }) => {
  const dispatch = useDispatch()

  const [showFollowing, setShowFollowing] = useState(false)
  const [followingToShow, setFollowingToShow] = useState(null)
  const [key, setKey] = useState(0)

  // Hide the following text for a prompt, update local state, and record user's answer
  const goToNext = (data) => {
    setCurrentIndex(currentIndex + 1)
    setShowFollowing(false)
    dispatch(answerPrompt(data))
  }

  // Show the following text for a prompt and update local state
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
                      <div className={styles.option} key={i} onClick={() => showFollowingText(i)}>
                        {option.label}
                      </div>
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
                  <button
                    className={styles.nextButton}
                    onClick={() => goToNext(section.options[followingToShow]?.version)}
                  >
                    Suite...
                  </button>
                </motion.div>
              </>
            )}
          </div>
        </AnimatePresence>
      )
    }
  })
}
