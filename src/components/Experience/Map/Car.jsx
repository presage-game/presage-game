import { useAnimations, useGLTF } from "@react-three/drei"
import React, { useEffect } from "react"

export const Car = ({animationsName = "Survey"}) => {
  const car = useGLTF("assets/vehicules/Fox/glTF/Fox.gltf")
  const animations = useAnimations(car.animations, car.scene)


  useEffect(() => {
    const action = animations.actions[animationsName]
    action.reset().fadeIn(0.5).play()

    return () => {
      action.fadeOut(0.5)
    }
  }, [animationsName])

  //   window.setTimeout(() => {
  //     animations.actions.Walk.play()
  //     animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1)
  //   }, 3000)

  return <primitive object={car.scene} scale={0.03} />
}