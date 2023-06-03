import { motion, AnimatePresence } from "framer-motion"
import { changeBlackBarsStatus } from "@/store/reducers/uiReducer"
import { useDispatch, useSelector } from "react-redux"

import "./BlackBars.scss"

export const BlackBars = () => {
  const { blackBarsStatus } = useSelector((state) => state.ui)
  const dispatch = useDispatch()

  const blackBarsClick = () => {
    if (blackBarsStatus === "window") {
      dispatch(changeBlackBarsStatus("cinema"))
    }
  }

  return (
    <>
      <AnimatePresence>
        {blackBarsStatus !== "opened" && (
          <div
            className="BlackBars"
            onClick={blackBarsClick}
            style={{
              pointerEvents:
                (blackBarsStatus === "cinema" || blackBarsStatus === "closed") && "none",
            }}
          >
            <motion.div
              key="barTop"
              className="bar bar--top"
              initial={{ y: 0 }}
              animate={{
                y:
                  blackBarsStatus === "closed" ? 0 : blackBarsStatus === "cinema" ? "-70%" : "-30%",
              }}
              exit={{ y: "-100%" }}
              transition={{ duration: 6, type: "spring", bounce: 0.2, restSpeed: 0.05 }}
            />
            <motion.div
              key="barBottom"
              className="bar bar--bottom"
              initial={{ y: 0 }}
              animate={{
                y: blackBarsStatus === "closed" ? 0 : blackBarsStatus === "cinema" ? "70%" : "30%",
              }}
              exit={{ y: "100%" }}
              transition={{ duration: 6, type: "spring", bounce: 0.2, restSpeed: 0.05 }}
            />
            <motion.div
              key="barLeft"
              className="wbar wbar--left"
              initial={{ x: 0 }}
              animate={{
                x:
                  blackBarsStatus === "closed"
                    ? "0%"
                    : blackBarsStatus === "cinema"
                    ? "-100%"
                    : "-15%",
              }}
              exit={{ x: "-100%" }}
              transition={{
                duration: blackBarsStatus === "closed" ? 0 : 4,
                type: "spring",
                bounce: 0.2,
                restSpeed: 0.05,
              }}
            />
            <motion.div
              key="barRight"
              className="wbar wbar--right"
              initial={{ x: 0 }}
              animate={{
                x:
                  blackBarsStatus === "closed"
                    ? "0%"
                    : blackBarsStatus === "cinema"
                    ? "100%"
                    : "15%",
              }}
              exit={{ x: "100%" }}
              transition={{
                duration: blackBarsStatus === "closed" ? 0 : 4,
                type: "spring",
                bounce: 0.2,
                restSpeed: 0.05,
              }}
            />
            <motion.p
              className="text"
              initial={{ opacity: 0 }}
              animate={{ opacity: blackBarsStatus === "window" ? 0.8 : 0 }}
              transition={{
                delay: blackBarsStatus === "closed" ? 4 : 0,
                duration: blackBarsStatus === "closed" ? 3 : 2,
                type: "spring",
              }}
              exit={{ opacity: 0 }}
            >
              Cliquer pour entrer dans la scène
            </motion.p>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
