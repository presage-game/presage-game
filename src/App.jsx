import { useState } from "react"
import { Experience } from "./components/Experience/Experience"
import { Introduction } from "./components/Introduction/Introduction"

function App() {
  const [game, setGame] = useState(false)

  return (
    <div className="App">{!game ? <Introduction setGame={() => setGame(true)} /> : <Experience />}</div>
  )
}

export default App
