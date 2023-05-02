import { useSelector } from "react-redux"
import { Button } from "@/components/Button/Button"
import { useDispatch } from "react-redux"
import { startExperience } from "@/store/reducers/introductionReducer"

import styles from "./Footer.module.scss"

export const Footer = () => {
  const { scenario } = useSelector((state) => state.introduction)
  const { gameCode } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  return (
    <footer className={styles.root}>
      <p className={styles.baseline}>[Début de l'expérience. Variante de scénario N°{scenario}].</p>
      <p>[Votre code partie : {gameCode}]</p>
      <Button text="Continuer" onClick={() => dispatch(startExperience())} />
    </footer>
  )
}
