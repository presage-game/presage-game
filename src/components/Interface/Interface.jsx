import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toggleBlackBars, toggleMap } from "@/store/reducers/uiReducer"

import scriptData from "@/assets/data/chapterOne/scenes.json"
import pinpointsData from "@/assets/data/chapterOne/pinpoints.json"
import styles from "./Interface.module.scss"

import { SceneTextBox } from "@/components/Interface/SceneTextBox/SceneTextBox"
import { MapTextBox } from "@/components/Interface/MapTextBox/MapTextBox"
import { IntersectionPopup } from "@/components/Interface/IntersectionPopup/IntersectionPopup"

export const Interface = ({ mapActive }) => {
  const dispatch = useDispatch()

  const { scene: sceneIndex, isPinpointActive } = useSelector((state) => state.user)
  const { pinpoint: pinpointIndex } = useSelector((state) => state.user)

  const [isPopupVisible, setIsPopupVisible] = useState(true)

  return (
    <div className={styles.root}>
      <div
        style={{
          position: "absolute",
          right: "2rem",
          bottom: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          zIndex: "20",
          mixBlendMode: "difference",
        }}
      >
        <button onClick={() => dispatch(toggleMap())}>
          {mapActive ? "Close map" : "Open map"}
        </button>
        <button
          onClick={() => {
            dispatch(toggleBlackBars())
          }}
        >
          Black Bars
        </button>
      </div>
      {!mapActive && <SceneTextBox sceneIndex={sceneIndex} scriptData={scriptData} />}
      {mapActive && (
        <>
          <IntersectionPopup
            scriptData={scriptData}
            pinpointsData={pinpointsData}
            sceneIndex={sceneIndex}
            pinpointIndex={pinpointIndex}
            isPopupVisible={isPopupVisible}
            setIsPopupVisible={setIsPopupVisible}
            isPinpointActive={isPinpointActive}
          />
          <MapTextBox
            pinpointsData={pinpointsData}
            pinpointIndex={pinpointIndex}
            mapActive={mapActive}
            isPopupVisible={isPopupVisible}
            setIsPopupVisible={setIsPopupVisible}
          />
        </>
      )}
    </div>
  )
}
