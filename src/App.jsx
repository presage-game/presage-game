import { useSelector } from "react-redux"
import { Experience } from "./components/Experience/Experience"
import { Introduction } from "./components/Introduction/Introduction"
import { Interface } from "./components/Interface/Interface"
import { useDispatch } from "react-redux"
import { startExperience } from "./store/reducers/introductionReducer"
import styles from "./App.module.scss"
import { getGame } from "./database/gamecode"

const App = () => {
  const dispatch = useDispatch()
  const hasExperienceStarted = useSelector((state) => state.introduction.hasExperienceStarted)

  return (
    <main className={styles.root}>
      {!hasExperienceStarted ? <Introduction /> : <Experience />}
      {hasExperienceStarted && <Interface />}
      {!hasExperienceStarted && (
        <>
          <button onClick={() => dispatch(startExperience())}>Passer l'introduction</button>
          <button onClick={() => getGame(1)}>Get game (test bdd)</button>
        </>
      )}
    </main>
  )
}

export default App
