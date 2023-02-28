import { useState } from "react"
import reactLogo from "./assets/react.svg"
import "./App.scss"
import { useDispatch } from "react-redux"
import { increase } from "./store/reducers/userReducer"
import { Game } from "./components/Game/Game.jsx"

function App() {
  const [count, setCount] = useState(0)
  const [game, setGame] = useState(false)
  const dispatch = useDispatch()

  const handleCount = (count) => {
    setCount(count + 1)
    dispatch(increase())
  }

  return (
    <div className="App">
      {!game ? (
        <>
          {" "}
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src="/vite.svg" className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => handleCount(count + 1)}>count is {count}</button>
            <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
            <button onClick={() => setGame(true)}>start game</button>
          </div>
          <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </>
      ) : (
        <Game />
      )}
    </div>
  )
}

export default App
