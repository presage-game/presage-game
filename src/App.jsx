import { useSelector } from "react-redux"
import { Experience } from "./components/Experience/Experience"
import { Introduction } from "./components/Introduction/Introduction"
import { useDispatch } from "react-redux"
import { startExperience } from "./store/reducers/introductionReducer"
import styles from "./App.module.scss"
import { getGame } from "./database/gamecode"

const App = () => {
  const dispatch = useDispatch()
  const { hasExperienceStarted } = useSelector((state) => state.introduction)

  return (
    <main className={styles.root}>
      {!hasExperienceStarted ? <Introduction /> : <Experience />}
      {!hasExperienceStarted && (
        <button
          style={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
          }}
          onClick={() => dispatch(startExperience())}
        >
          (Passer l'introduction)
        </button>
      )}
    </main>
  )
}

export default App
