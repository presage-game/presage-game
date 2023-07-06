import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { changeBlackBarsStatus } from "@/store/reducers/uiReducer"
import { toggleMute } from "@/store/reducers/audioReducer"

import scenesData from "@/assets/data/newScenes.json"
import pinpointsData from "@/assets/data/pinpoints.json"
import presagesData from "@/assets/data/presages.json"

import { BlackBars } from "@/components/BlackBars/BlackBars"
import { SceneTextBox } from "./SceneTextBox/SceneTextBox"
import { MapTextBox } from "./MapTextBox/MapTextBox"
import { PresageTextBox } from "./PresageTextBox/PresageTextBox"
import { IntersectionPopup } from "./IntersectionPopup/IntersectionPopup"
import { Collection } from "./Collection/Collection"
import { Options } from "./Options/Options"
import { devUrlChecker } from "@/helpers/checkers/devUrlChecker"

export const Interface = ({
  mapActive,
  spotIndex,
  showText,
  setShowText,
  isIntroActive,
  setIsIntroActive,
  showPresage,
  setShowPresage,
  activateBlackBars,
}) => {
  const dispatch = useDispatch()

  const { blackBarsStatus } = useSelector((state) => state.ui)
  const OpenBlackBars = () => dispatch(changeBlackBarsStatus("opened"))
  const {
    scene: sceneIndex,
    isPinpointActive,
    pinpoint: pinpointIndex,
  } = useSelector((state) => state.map)
  const { isMuted } = useSelector((state) => state.audio)

  const [isPopupVisible, setIsPopupVisible] = useState(true)

  useEffect(() => {
    if (showPresage) {
      setShowText(false)
    }
  }, [showPresage])

  return (
    <>
      {devUrlChecker() && (
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
        </div>
      )}
      {activateBlackBars && <BlackBars setIsIntroActive={setIsIntroActive} mapActive={mapActive} />}
      {!mapActive && blackBarsStatus !== "closed" && blackBarsStatus !== "window" && (
        <SceneTextBox
          mapActive={mapActive}
          sceneIndex={sceneIndex}
          scenesData={scenesData}
          spotIndex={spotIndex}
          showText={showText}
          setShowText={setShowText}
          isIntroActive={isIntroActive}
          setIsIntroActive={setIsIntroActive}
          OpenBlackBars={OpenBlackBars}
        />
      )}
      {/* Work in progress */}
      {!mapActive && sceneIndex === 2 && (
        <PresageTextBox
          presagesData={presagesData}
          mapActive={mapActive}
          sceneIndex={sceneIndex}
          spotIndex={spotIndex}
          showText={showText}
          setShowText={setShowText}
          showPresage={showPresage}
          setShowPresage={setShowPresage}
        />
      )}
      {mapActive && (
        <>
          <IntersectionPopup
            scenesData={scenesData}
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
            showText={showText}
            setShowText={setShowText}
          />
        </>
      )}
      <Collection />
      <Options />
    </>
  )
}
