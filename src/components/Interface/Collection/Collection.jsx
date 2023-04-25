import { useSelector } from "react-redux"
import styles from "./Collection.module.scss"

import adinkraOneIcon from "@/assets/img/adinkra-1.svg"
import adinkraTwoIcon from "@/assets/img/adinkra-2.svg"
import adinkraThreeIcon from "@/assets/img/adinkra-3.svg"

export const Collection = () => {
  const { collectedAdinkras } = useSelector((state) => state.user)

  return (
    <div className={styles.root}>
      <div className={`${styles.item} ${collectedAdinkras[0] && styles.active}`}>
        <div className={styles.icon}>
          <img src={adinkraOneIcon} />
        </div>
      </div>
      <div className={`${styles.item} ${collectedAdinkras[1] && styles.active}`}>
        <div className={styles.icon}>
          <img src={adinkraTwoIcon} />
        </div>
      </div>
      <div className={`${styles.item} ${collectedAdinkras[2] && styles.active}`}>
        <div className={styles.icon}>
          <img src={adinkraThreeIcon} />
        </div>
      </div>
    </div>
  )
}
