import { useSelector } from "react-redux"
import { StartButton } from "@/components/StartButton/StartButton"
import styles from "./Footer.module.scss"

export const Footer = () => {
  const { scenario } = useSelector((state) => state.introduction)
  const { gameCode } = useSelector((state) => state.user)

  return (
    <footer className={styles.root}>
      <p className={styles.baseline}>[Début de l'expérience. Variante de scénario N°{scenario}].</p>
      <p>[Votre code partie : {gameCode}]</p>
      <StartButton text={"Continuer"} />
    </footer>
  )
}
