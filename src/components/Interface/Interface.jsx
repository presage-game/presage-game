import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toggleBlackBars, toggleMap } from "@/store/reducers/uiReducer"
import { toggleMute } from "@/store/reducers/audioReducer"

import scriptData from "@/assets/data/chapterOne/scenes.json"
import pinpointsData from "@/assets/data/chapterOne/pinpoints.json"

import { SceneTextBox } from "./SceneTextBox/SceneTextBox"
import { MapTextBox } from "./MapTextBox/MapTextBox"
import { IntersectionPopup } from "./IntersectionPopup/IntersectionPopup"
import { Collection } from "./Collection/Collection"
import { Options } from "./Options/Options"

export const Interface = ({
  mapActive,
  spotIndex,
  showText,
  setShowText,
  isVoiceOver,
  setIsVoiceOver,
}) => {
  const dispatch = useDispatch()

  const {
    scene: sceneIndex,
    isPinpointActive,
    pinpoint: pinpointIndex,
  } = useSelector((state) => state.map)
  const { isMuted } = useSelector((state) => state.audio)

  const [isPopupVisible, setIsPopupVisible] = useState(true)

  return (
    <>
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
        <button
          style={{ marginLeft: "3rem", cursor: "none" }}
          onClick={() => dispatch(toggleMute())}
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
        <button
          style={{ marginLeft: "3rem", cursor: "none" }}
          onClick={() => {
            dispatch(toggleBlackBars())
          }}
        >
          [Cinematic mode]
        </button>
      </div>
      {!mapActive && (
        <SceneTextBox
          mapActive={mapActive}
          sceneIndex={sceneIndex}
          scriptData={scriptData}
          spotIndex={spotIndex}
          showText={showText}
          setShowText={setShowText}
          isVoiceOver={isVoiceOver}
          setIsVoiceOver={setIsVoiceOver}
        />
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
    </>
  )
}
