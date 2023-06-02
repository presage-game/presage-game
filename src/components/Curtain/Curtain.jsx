import { changeCurtainStatus } from "@/store/reducers/uiReducer"
import "./Curtain.scss"
import { AnimatePresence, motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"

export const Curtain = () => {
  const { curtainStatus } = useSelector((state) => state.ui)
  const dispatch = useDispatch()

  return (
    <AnimatePresence>
      {curtainStatus !== 2 && (
        <div className="Curtain" onClick={() => dispatch(changeCurtainStatus(2))}>
          <motion.div
            key="barLeft"
            className="bar bar--left"
            initial={{ x: 0 }}
            animate={{ x: curtainStatus === 0 ? "0%" : "-15%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: curtainStatus === 0 ? 0 : curtainStatus === 1 ? 4 : 2 }}
          />
          <motion.div
            key="barRight"
            className="bar bar--right"
            initial={{ x: 0 }}
            animate={{ x: curtainStatus === 0 ? "0%" : "15%" }}
            exit={{ x: "100%" }}
            transition={{ duration: curtainStatus === 0 ? 0 : 4 }}
          />
          <motion.p
            className="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: curtainStatus === 1 ? 0.8 : 0 }}
            transition={{
              delay: curtainStatus === 1 ? 4 : 2,
              duration: curtainStatus === 1 ? 3 : 2,
            }}
            exit={{ opacity: 0 }}
          >
            Cliquer pour entrer dans la scène
          </motion.p>
        </div>
      )}
    </AnimatePresence>
  )
}
