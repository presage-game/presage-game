import { useEffect } from "react"
import { useSelector } from "react-redux"
import "./Collection.scss"

import adinkraOneIcon from "@/assets/img/adinkra-1.svg"
import adinkraTwoIcon from "@/assets/img/adinkra-2.svg"
import adinkraThreeIcon from "@/assets/img/adinkra-3.svg"

export const Collection = () => {
  const { adinkras } = useSelector((state) => state.user)
  const adinkrasIcons = [adinkraOneIcon, adinkraTwoIcon, adinkraThreeIcon]

  return (
    <div className="Collection">
      {adinkrasIcons.map((icon, index) => {
        return (
          <div key={index} className={`item ${adinkras[index].isCollected ? "item--active" : ""}`}>
            <div className="item__icon">
              <img src={icon} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
