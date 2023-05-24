import { useAnimations, useGLTF } from "@react-three/drei"
import React, { useEffect, useState } from "react"
import { Smoke } from "./Smoke"

export const Car = ({ animationsName = "Run" }) => {
  const car = useGLTF("assets/vehicules/truck/truck.glb")
  const animations = useAnimations(car.animations, car.scene)
  const [turnSound] = useState(() => new Audio("assets/vehicules/truck/turn.mp3"))
  const [runSound] = useState(() => new Audio("assets/vehicules/truck/run.mp3"))

  const engine = animations.actions["Car engine"]
  engine.reset().fadeIn(0.5).play()

  turnSound.currentTime = 0
  turnSound.loop = true
  turnSound.play()

  useEffect(() => {
    if (animationsName) {
      const wheel_left = animations.actions["wheel_left"]
      wheel_left.play()

      const wheel_right = animations.actions["wheel_right"]
      wheel_right.play()

      turnSound.pause()
      runSound.currentTime = 0
      runSound.loop = true
      runSound.play()

      return () => {
        wheel_left.stop()
        wheel_right.stop()
        turnSound.play()
        runSound.pause()
      }
    }
  }, [animationsName])

  window.setTimeout(() => {
    // animations.actions.Walk.play()
    // animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1)
  }, 3000)

  return (
    <group>
      <primitive
        object={car.scene}
        scale={0.007}
        rotation={[0, -Math.PI / 2, 0]}
        position={[0, 0.2, 0]}
      />
      {animationsName === "Car engine" && (
        <>
          <Smoke position={{ x: -1, y: 0, z: 0.8 }} /> <Smoke position={{ x: 1, y: 0, z: 0.8 }} />
        </>
      )}
    </group>
  )
}
