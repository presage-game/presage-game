import { useState } from "react"
import "./App.scss"
import { Game } from "./components/Game/Game.jsx"
import { Introduction } from "./components/Introduction/Introduction"

function App() {
  const [game, setGame] = useState(false)

  return (
    <div className="App">{!game ? <Introduction setGame={() => setGame(true)} /> : <Game />}</div>
  )
}

export default App
