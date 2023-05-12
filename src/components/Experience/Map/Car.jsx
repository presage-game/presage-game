import { useAnimations, useGLTF } from "@react-three/drei"
import React, { useEffect } from "react"
import { Smoke } from "./Smoke"

export const Car = ({ animationsName = "Take 001" }) => {
  const car = useGLTF("assets/vehicules/testplane-transformed.glb")
  const animations = useAnimations(car.animations, car.scene)

  useEffect(() => {
    const action = animations.actions[animationsName]
    action.reset().fadeIn(0.5).play()

    return () => {
      action.fadeOut(0.5)
    }
  }, [animationsName])

  window.setTimeout(() => {
    // animations.actions.Walk.play()
    // animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1)
  }, 3000)

  return (
    <group>
      <primitive object={car.scene} scale={2.5} />
      {animationsName === "Take 001" && (
        <>
          <Smoke position={{ x: -0.5, y: 0, z: 0.5 }} />{" "}
          <Smoke position={{ x: 0.5, y: 0, z: 0.5 }} />
        </>
      )}
    </group>
  )
}
