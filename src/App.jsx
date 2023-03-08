import { useSelector } from "react-redux"
import { Experience } from "./components/Experience/Experience"
import { Introduction } from "./components/Introduction/Introduction"

const App = () => {
  const hasExperienceStarted = useSelector((state) => state.introduction.hasExperienceStarted)

  return <div className="App">{!hasExperienceStarted ? <Introduction /> : <Experience />}</div>
}

export default App
