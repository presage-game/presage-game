import { Canvas } from "@react-three/fiber"
import classes from "./Experience.module.scss"
import { Setup as RegionEntranceOne } from "./chapterOne/1/Setup"
import { Setup as PhosphateMine } from "./chapterOne/2/Setup"
import { useSelector } from "react-redux"
import { useEffect } from "react"

export const Experience = () => {
  const isOnMap = useSelector((state) => state.ui.isOnMap)
  const scene = useSelector((state) => state.user.scene)
  useEffect(() => {
    console.log(scene)
    console.log(isOnMap)
  }, [scene, isOnMap])

  return (
    <div className={classes.root}>
      <Canvas>{scene === 1 ? <RegionEntranceOne /> : <PhosphateMine />}</Canvas>
    </div>
  )
}
