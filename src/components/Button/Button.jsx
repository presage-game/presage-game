import styles from "./Button.module.scss"

export const Button = ({ text, onClick, variant }) => {
  return (
    <button
      className={`${variant === "splashScreen" && styles.splashScreen} ${
        variant === "boxText" && styles.boxText
      } ${styles.root}`}
      onClick={onClick}
    >
      <div className={styles.buttonBorder}>{text}</div>
    </button>
  )
}
