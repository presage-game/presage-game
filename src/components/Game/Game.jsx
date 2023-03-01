import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import classes from "./Game.module.scss"
import { useEffect } from "react"
import { Introduction } from "../scenes/introduction/Introduction"

export const Game = () => {

  return (
    <div className={classes.container}>
      <Canvas>
        <Introduction />
      </Canvas>
    </div>
  )
}
