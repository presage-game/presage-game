import { useSelector } from "react-redux"
import { Button } from "@/components/Button/Button"
import { useDispatch } from "react-redux"
import { startExperience } from "@/store/reducers/userReducer"

import styles from "./Footer.module.scss"

export const Footer = () => {
  const { scenario, gameCode } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  return (
    <footer className={styles.root}>
      <div className={styles.baseline}>
        <p>[Début de l'expérience. Variante de scénario N°{scenario}].</p>
        <p>[Votre code partie : {gameCode}]</p>
      </div>
      <Button text="Continuer" onClick={() => dispatch(startExperience())} />
    </footer>
  )
}
