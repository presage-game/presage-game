import { useSelector } from "react-redux"
import styles from "./Options.module.scss"

import settingsIcon from "@/assets/img/settings.svg"
import volumeIcon from "@/assets/img/volume.svg"

export const Options = () => {
  const { isMuted } = useSelector((state) => state.audio)

  return (
    <div className={styles.root}>
      <div className={`${styles.volume} ${!isMuted && styles.active}`}>
        <div className={styles.icon}>
          <img src={volumeIcon} />
        </div>
      </div>
      <div className={styles.menu}>
        <div className={styles.icon}>
          <img src={settingsIcon} />
        </div>
      </div>
    </div>
  )
}
