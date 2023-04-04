import { useState } from "react"
import styles from "./SplashScreen.module.scss"
import { getGame } from "@/database/gamecode"
import { useDispatch } from "react-redux"
import { changeGameCode } from "@/store/reducers/userReducer"

export const SplashScreen = ({ setShowIntroduction }) => {
  const [code, setCode] = useState(1)
  const dispatch = useDispatch()

  const onSubmit = async () => {
    console.log(code)
    try {
      const data = await getGame(code)
      dispatch(changeGameCode(data.game_code))
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Projet "Anan Uua"</h1>
      <button
        className={styles.startButton}
        onClick={() => {
          setShowIntroduction(true)
        }}
      >
        Démarrer
      </button>
      <div className={styles.loadGame}>
        <label htmlFor="tentacles">Continuer une partie :</label>
        <input
          type="number"
          id="tentacles"
          name="tentacles"
          min="1"
          max="999999"
          inputMode="numeric"
          defaultValue={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button onClick={onSubmit}>Envoyer</button>
      </div>
    </div>
  )
}
