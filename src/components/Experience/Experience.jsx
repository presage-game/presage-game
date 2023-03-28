import { Canvas } from "@react-three/fiber"
import classes from "./Experience.module.scss"
import { RegionEntranceOne } from "./scenes/RegionEntranceOne/RegionEntranceOne"
import { Map } from "./scenes/Map/Map"
import { useState } from "react"

export const Experience = () => {
  const [showMap, setShowMap] = useState(false)

  return (
    <div className={classes.container}>
      <Canvas>{showMap ? <Map /> : <RegionEntranceOne />}</Canvas>
      <div className={classes.mapButton} onClick={() => setShowMap(!showMap)}>
        Map
      </div>
    </div>
  )
}
