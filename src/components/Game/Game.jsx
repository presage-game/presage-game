import { Canvas } from "@react-three/fiber"
import classes from "./Game.module.scss"
import { RegionEntranceOne } from "./scenes/RegionEntranceOne/RegionEntranceOne"

export const Game = () => {
  return (
    <div className={classes.container}>
      <Canvas>
        <RegionEntranceOne />
      </Canvas>
    </div>
  )
}
