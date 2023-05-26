import { motion, AnimatePresence } from "framer-motion"
import { useSelector } from "react-redux"

import "./BlackBars.scss"

export const BlackBars = () => {
  const { showBlackBars } = useSelector((state) => state.ui)

  return (
    <AnimatePresence>
      {showBlackBars && (
        <div className="BlackBars">
          <motion.div
            key="barTop"
            className="bar bar--top"
            initial={{ y: -170 }}
            animate={{ y: 0 }}
            exit={{ y: -170 }}
            transition={{ duration: 6 }}
          />
          <motion.div
            key="barBottom"
            className="bar bar--bottom"
            initial={{ y: 170 }}
            animate={{ y: 0 }}
            exit={{ y: 170 }}
            transition={{ duration: 6 }}
          />
        </div>
      )}
    </AnimatePresence>
  )
}
