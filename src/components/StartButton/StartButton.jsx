import { useDispatch } from "react-redux"
import { startExperience } from "@/store/reducers/introductionReducer"
import styles from "./StartButton.module.scss"

export const StartButton = ({ text }) => {
  const dispatch = useDispatch()

  return (
    <button className={styles.root} onClick={() => dispatch(startExperience())}>
      {text}
    </button>
  )
}
