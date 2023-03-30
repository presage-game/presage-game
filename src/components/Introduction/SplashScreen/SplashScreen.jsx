import styles from "./SplashScreen.module.scss"

export const SplashScreen = ({ setShowIntroduction }) => {
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
    </div>
  )
}
