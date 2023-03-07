import { Canvas } from "@react-three/fiber"
import classes from "./Experience.module.scss"
import { RegionEntranceOne } from "./scenes/RegionEntranceOne/RegionEntranceOne"

export const Experience = () => {
  return (
    <div className={classes.container}>
      <Canvas>
        <RegionEntranceOne />
      </Canvas>
    </div>
  )
}
