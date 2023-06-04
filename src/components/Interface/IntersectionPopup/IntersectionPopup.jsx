import { useDispatch, useSelector } from "react-redux"
import { changeScene, showPinpoint } from "@/store/reducers/mapReducer"
import { toggleMap } from "@/store/reducers/uiReducer"

import { motion, AnimatePresence } from "framer-motion"

import "@/components/Interface/IntersectionPopup/IntersectionPopup.scss"

export const IntersectionPopup = ({
  scriptData,
  pinpointsData,
  sceneIndex,
  pinpointIndex,
  setIsPopupVisible,
  isPinpointActive,
}) => {
  const { isSceneIntersecting, isPinpointIntersecting } = useSelector((state) => state.map)

  const dispatch = useDispatch()

  const triggerPinpoint = () => {
    dispatch(showPinpoint())

    if (!isPinpointActive) {
      setIsPopupVisible(true)
    }
  }

  const triggerScene = (index) => {
    dispatch(toggleMap())
    dispatch(changeScene(index))
  }

  return (
    <AnimatePresence>
      {isPinpointIntersecting && !isPinpointActive && (
        <motion.div
          className="IntersectionPopup"
          onClick={triggerPinpoint}
          initial={{ opacity: 0, x: "-50%", y: "-50%", scale: 0.9 }}
          animate={{ opacity: 1, x: "-50%", y: "-50%", scale: 1 }}
          exit={{ opacity: 0, x: "-50%", y: "-50%", scale: 0.9 }}
          transition={{ scale: { type: "spring", stiffness: 100 } }}
        >
          <div className="IntersectionPopup__inner">
            <h2 className="IntersectionPopup__title">{pinpointsData[pinpointIndex]?.name}</h2>
            <div className="IntersectionPopup__icon">
              <svg viewBox="0 0 472 274" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M236 273.08C362.71 273.08 462.981 148.343 467.18 143.036L471.953 137L467.18 130.964C462.981 125.657 362.71 0.919922 236 0.919922C109.29 0.919922 9.01843 125.657 4.81939 130.964L0.046875 137L4.81939 143.036C9.01843 148.343 109.29 273.08 236 273.08ZM236 20.3599C338.002 20.3599 425.248 112.311 446.827 137C425.277 161.708 338.147 253.64 236 253.64C133.998 253.64 46.7515 161.689 25.1731 137C46.7223 112.292 133.852 20.3599 236 20.3599Z"
                  fill="white"
                />
                <path
                  d="M236 224.48C284.24 224.48 323.48 185.231 323.48 137C323.48 88.7694 284.24 49.52 236 49.52C187.759 49.52 148.52 88.7694 148.52 137C148.52 185.231 187.759 224.48 236 224.48ZM236 68.96C273.509 68.96 304.04 99.4808 304.04 137C304.04 174.519 273.509 205.04 236 205.04C198.49 205.04 167.96 174.519 167.96 137C167.96 99.4808 198.49 68.96 236 68.96Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </motion.div>
      )}
      {isSceneIntersecting && (
        <motion.div
          className="IntersectionPopup"
          onClick={() => triggerScene(sceneIndex)}
          initial={{ opacity: 0, y: "-50%", x: "-50%", scale: 0.9 }}
          animate={{ opacity: 1, y: "-50%", x: "-50%", scale: 1 }}
          exit={{ opacity: 0, x: "-50%", y: "-50%", scale: 0.9 }}
          transition={{ scale: { type: "spring", stiffness: 100 } }}
        >
          <div className="IntersectionPopup__inner">
            <h2 className="IntersectionPopup__title">{scriptData[sceneIndex]?.name}</h2>
            <div className="IntersectionPopup__icon">
              <svg
                width="20"
                height="34"
                viewBox="0 0 20 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99999 0L9.99999 32.5M9.99999 32.5L19 22M9.99999 32.5L0.999993 22"
                  stroke="#2E2724"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
