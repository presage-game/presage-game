import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { answerPrompt } from "@/store/reducers/introductionReducer"
import styles from "./Prompts.module.scss"

export const Prompts = ({ introduction, currentIndex }) => {
  const dispatch = useDispatch()

  const [showFollowing, setShowFollowing] = useState(false)
  const [followingToShow, setFollowingToShow] = useState(null)

  // Hide the following text for a prompt, update local state, and record user's answer
  const hideFollowingText = (data) => {
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
    }

    const options = section.options.map((option, i) => {
      return (
        <div className={styles.option} key={i} onClick={() => showFollowingText(i)}>
          {option.label}
        </div>
      )
    })

    const followingText = showFollowing && (
      <p className={`${styles.baseline} ${true && styles.active}`}>
        {section.options[followingToShow].following}
        <button
          className={styles.nextButton}
          onClick={() => hideFollowingText(section.options[followingToShow]?.version)}
        >
          Suite...
        </button>
      </p>
    )

    return (
      <div className={styles.root} key={index}>
        <span className={styles.date}>{section.date}</span>
        {!showFollowing && <p className={styles.baseline}>{section.baseline}</p>}
        {!showFollowing && <div className={styles.options}>{options}</div>}
        {followingText}
      </div>
    )
  })
}
