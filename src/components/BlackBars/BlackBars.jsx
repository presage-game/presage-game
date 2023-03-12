import styles from './BlackBars.module.scss'

export const BlackBars = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topBar} />
      <div className={styles.bottomBar} />
    </div>
  )
}
