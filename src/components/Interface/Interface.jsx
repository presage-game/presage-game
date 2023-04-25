import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toggleBlackBars, toggleMap } from "@/store/reducers/uiReducer"

import scriptData from "@/assets/data/chapterOne/scenes.json"
import pinpointsData from "@/assets/data/chapterOne/pinpoints.json"
import styles from "./Interface.module.scss"

import { SceneTextBox } from "@/components/Interface/SceneTextBox/SceneTextBox"
import { MapTextBox } from "@/components/Interface/MapTextBox/MapTextBox"
import { IntersectionPopup } from "@/components/Interface/IntersectionPopup/IntersectionPopup"
import { Collection } from "@/components/Interface/Collection/Collection"
import { Options } from "@/components/Interface/Options/Options"

export const Interface = ({ mapActive, spotIndex }) => {
  const dispatch = useDispatch()

  const {
    scene: sceneIndex,
    isPinpointActive,
    pinpoint: pinpointIndex,
  } = useSelector((state) => state.map)

  const [isPopupVisible, setIsPopupVisible] = useState(true)

  useEffect(() => {
    console.log("spotIndex", spotIndex)
  }, [spotIndex])

  return (
    <div className={styles.root}>
      <div
        style={{
          position: "absolute",
          zIndex: "10",
          mixBlendMode: "difference",
          top: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {sceneIndex !== null && !mapActive && (
          <button style={{ cursor: "pointer" }} onClick={() => dispatch(toggleMap())}>
            {mapActive ? "Close map" : "[Go to map]"}
          </button>
        )}
        <button
          style={{ marginLeft: "3rem", cursor: "pointer" }}
          onClick={() => {
            dispatch(toggleBlackBars())
          }}
        >
          [Cinematic mode]
        </button>
      </div>
      {!mapActive && (
        <SceneTextBox sceneIndex={sceneIndex} scriptData={scriptData} spotIndex={spotIndex} />
      )}
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
      <Collection />
      <Options />
    </div>
  )
}
