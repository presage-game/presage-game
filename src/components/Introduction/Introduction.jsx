import { useDispatch } from "react-redux"
import { increase } from "../../store/reducers/userReducer"
import { useState } from "react"

export const Introduction = ({setGame}) => {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()

  const handleCount = (count) => {
    setCount(count + 1)
    dispatch(increase())
  }

  return (
    <div>
      <h2>Introduction</h2>
      <div className="card">
        <button onClick={() => handleCount(count + 1)}>count is {count}</button>
        <button onClick={setGame}>start game</button>
      </div>
    </div>
  )
}
