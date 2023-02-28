import { OrbitControls } from "@react-three/drei"
import classes from "./Game.module.scss"
import { Canvas } from "@react-three/fiber"
import { Introduction } from "../scenes/introduction/Introduction"

export const Game = () => {
  return (
    <div className={classes.container}>
      <Canvas>
        <Introduction />
        <OrbitControls />
      </Canvas>
    </div>
  )
}
