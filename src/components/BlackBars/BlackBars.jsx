import { motion, AnimatePresence } from "framer-motion"
import { useSelector } from "react-redux"

import styles from "./BlackBars.module.scss"

export const BlackBars = () => {
  const { showBlackBars } = useSelector((state) => state.ui)

  return (
    <AnimatePresence>
      {showBlackBars && (
        <div className={styles.root}>
          <motion.div
            key="topBar"
            className={styles.topBar}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 1.7 }}
          />
          <motion.div
            key="bottomBar"
            className={styles.bottomBar}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 1.7 }}
          />
        </div>
      )}
    </AnimatePresence>
  )
}
