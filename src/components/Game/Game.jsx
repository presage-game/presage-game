import { Canvas } from "@react-three/fiber"
import classes from "./Game.module.scss"
import { Introduction } from "../scenes/Introduction/Introduction"

export const Game = () => {
  return (
    <div className={classes.container}>
      <Canvas>
        <Introduction />
      </Canvas>
    </div>
  )
}
