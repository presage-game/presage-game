import { useSelector } from "react-redux"
import { Experience } from "./components/Experience/Experience"
import { Introduction } from "./components/Introduction/Introduction"
import { useDispatch } from "react-redux"
import { startExperience } from "./store/reducers/userReducer"

import "./App.scss"

const App = () => {
  const dispatch = useDispatch()
  const { hasExperienceStarted } = useSelector((state) => state.user)

  return (
    <main className="App">
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
