import { useSelector } from "react-redux"
import { Experience } from "./components/Experience/Experience"
import { Introduction } from "./components/Introduction/Introduction"
import { Cursor } from "@/components/Interface/Cursor/Cursor"
import { useDispatch } from "react-redux"
import { startExperience } from "./store/reducers/userReducer"

import "./App.scss"
import { useControls } from "leva"
import { useEffect } from "react"
import { changeBlackBarsStatus } from "./store/reducers/uiReducer"

const App = () => {
  const dispatch = useDispatch()
  const { hasExperienceStarted } = useSelector((state) => state.user)
  const gui = useControls({
    BlackBars: false
  })

  useEffect(() => {
    if(!gui.BlackBars) {
      dispatch(changeBlackBarsStatus("opened"))
    }
  },[gui.BlackBars])

  return (
    <main className="App">
      <Cursor />
      {!hasExperienceStarted ? <Introduction /> : <Experience activateBlackBars={gui.BlackBars} />}
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
