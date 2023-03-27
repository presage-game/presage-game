import { Canvas } from "@react-three/fiber"
import classes from "./Experience.module.scss"
import { Setup } from "./chapterOne/RegionEntranceOne/Setup"

export const Experience = () => {
  return (
    <div className={classes.root}>
      <Canvas>
        <Setup />
      </Canvas>
    </div>
  )
}
