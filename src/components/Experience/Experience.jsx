import { Canvas } from "@react-three/fiber"
import { Loader } from "@react-three/drei"
import classes from "./Experience.module.scss"
import { Setup as RegionEntranceOne } from "./chapterOne/1/Setup"
import { Setup as PhosphateMine } from "./chapterOne/2/Setup"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { Setup as Map } from "./Map/Setup"

export const Experience = () => {
  const isOnMap = useSelector((state) => state.ui.isOnMap)
  const scene = useSelector((state) => state.user.scene)
  useEffect(() => {
    console.log(scene)
    console.log(isOnMap)
  }, [scene, isOnMap])

  return (
    <div className={classes.root}>
      <Loader dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`} />
      <Canvas>{isOnMap ? <Map /> : scene === 1 ? <RegionEntranceOne /> : <PhosphateMine />}</Canvas>
    </div>
  )
}
