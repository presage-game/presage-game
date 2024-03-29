import { motion, AnimatePresence, MotionConfig } from "framer-motion"
import { changeBlackBarsStatus } from "@/store/reducers/uiReducer"
import { useDispatch, useSelector } from "react-redux"

import "./BlackBars.scss"
import { useEffect, useState } from "react"
import { DefaultLoadingManager } from "three"

export const BlackBars = ({ setIsVoiceOver, mapActive }) => {
  const { blackBarsStatus } = useSelector((state) => state.ui)
  const [pointerEvents, setPointerEvents] = useState(false)
  const [inAnimation, setInAnimation] = useState(false)
  const dispatch = useDispatch()

  const blackBarsClick = () => {
    if (blackBarsStatus === "window" && !pointerEvents && !inAnimation) {
      dispatch(changeBlackBarsStatus("cinema"))
    }
  }

  useEffect(() => {
    if (!mapActive) {
      if (blackBarsStatus === "cinema") {
        let timeout = setTimeout(() => {
          setPointerEvents(true)
        }, 2000)

        return () => {
          clearTimeout(timeout)
        }
      }
    }
  }, [blackBarsStatus])

  useEffect(() => {
    if (mapActive) {
      dispatch(changeBlackBarsStatus("opened"))
    }
  }, [mapActive])

  useEffect(() => {
    DefaultLoadingManager.onStart = () => {
      if (!mapActive) {
        setPointerEvents(false)
        setInAnimation(true)
        dispatch(changeBlackBarsStatus("closed"))
      }
    }
    DefaultLoadingManager.onLoad = () => {
      if (!mapActive) {
        setIsVoiceOver(true)
        setTimeout(() => dispatch(changeBlackBarsStatus("window")), 1000)
        setTimeout(() => setInAnimation(false), 3300)
      }
    }
  }, [mapActive])

  useEffect(() => {
    if (!mapActive) {
      dispatch(changeBlackBarsStatus("closed"))
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {blackBarsStatus !== "opened" && (
          <div
            className="BlackBars"
            onClick={blackBarsClick}
            style={{
              pointerEvents: pointerEvents && "none",
            }}
          >
            <MotionConfig
              transition={{
                duration: 4,
                type: "spring",
                bounce: 0.2,
                restSpeed: 0.05,
                restDelta: 0.5,
              }}
            >
              <motion.div
                key="barTop"
                className="bar bar--top"
                initial={{ y: 0 }}
                animate={{
                  y:
                    blackBarsStatus === "closed"
                      ? 0
                      : blackBarsStatus === "cinema"
                      ? "-70%"
                      : "-30%",
                }}
                exit={{ y: "-100%" }}
              />
              <motion.div
                key="barBottom"
                className="bar bar--bottom"
                initial={{ y: 0 }}
                animate={{
                  y:
                    blackBarsStatus === "closed" ? 0 : blackBarsStatus === "cinema" ? "70%" : "30%",
                }}
                exit={{ y: "100%" }}
              />
            </MotionConfig>
            <MotionConfig
              transition={{
                duration: blackBarsStatus === "closed" ? 0 : 3,
                type: "spring",
                bounce: 0.2,
                restSpeed: 0.05,
                restDelta: 0.5,
              }}
            >
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
              />
            </MotionConfig>
            <motion.p
              className="text"
              initial={{ opacity: 0 }}
              animate={{ opacity: blackBarsStatus === "window" ? 0.5 : 0 }}
              transition={{
                delay: blackBarsStatus === "closed" ? 4 : 0,
                duration: blackBarsStatus === "closed" ? 3 : 2,
                type: "spring",
              }}
              exit={{ opacity: 0 }}
            >
              Cliquez pour entrer
            </motion.p>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
