import { useSelector } from "react-redux"
import "./Options.scss"

import settingsIcon from "@/assets/img/settings.svg"
import volumeIcon from "@/assets/img/volume.svg"

export const Options = () => {
  const { isMuted } = useSelector((state) => state.audio)

  return (
    <div className="Options">
      <div className={`volume ${!isMuted && "volume--is-muted"}`}>
        <div className="volume__icon">
          <img src={volumeIcon} />
        </div>
      </div>
      <div className="menu">
        <div className="menu__icon">
          <img src={settingsIcon} />
        </div>
      </div>
    </div>
  )
}
