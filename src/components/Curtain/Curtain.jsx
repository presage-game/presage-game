import "./Curtain.scss"
import { AnimatePresence, motion } from "framer-motion"
import { useSelector } from "react-redux"

export const Curtain = () => {
  const { curtainStatus } = useSelector((state) => state.ui)

  return (
    <AnimatePresence>
      {curtainStatus !== 2 && (
        <div className="Curtain">
          <motion.div
            key="barLeft"
            className="bar bar--left"
            initial={{ x: 0 }}
            animate={{ x: curtainStatus === 0 ? "0%" : "-15%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: curtainStatus === 0 ? 0 : 6 }}
          />
          <motion.div
            key="barRight"
            className="bar bar--right"
            initial={{ x: 0 }}
            animate={{ x: curtainStatus === 0 ? "0%" : "15%" }}
            exit={{ x: "100%" }}
            transition={{ duration: curtainStatus === 0 ? 0 : 6 }}
          />
          <motion.p
            className="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: curtainStatus === 1 ? 0.8 : 0 }}
            transition={{ delay: 4, duration: 3 }}
          >
            Cliquer pour entrer dans la scène
          </motion.p>
        </div>
      )}
    </AnimatePresence>
  )
}
