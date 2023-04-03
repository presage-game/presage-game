import { useState } from "react"
import styles from "./SplashScreen.module.scss"
import { getGame } from "@/database/gamecode"

export const SplashScreen = ({ setShowIntroduction }) => {
  const [code, setCode] = useState(1)

  const onSubmit = () => {
    console.log(code)
    getGame(code)
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
