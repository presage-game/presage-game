import { useSelector } from "react-redux"
import { Experience } from "./components/Experience/Experience"
import { Introduction } from "./components/Introduction/Introduction"
import { Interface } from "./components/Interface/Interface"
import { StartButton } from "./components/StartButton/StartButton"

const App = () => {
  const hasExperienceStarted = useSelector((state) => state.introduction.hasExperienceStarted)

  return (
    <div className="App">
      {!hasExperienceStarted ? <Introduction /> : <Experience />}
      {hasExperienceStarted && <Interface />}
      {!hasExperienceStarted && <StartButton text={"Passer l'intro (debug)"} />}
    </div>
  )
}

export default App
