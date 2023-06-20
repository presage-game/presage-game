import { Model } from "./Model"

export const Scene = () => {
  return (
    <>
      <Model rotation={[0, -Math.PI / 40, 0]} position={[30, -17, -222]} />
    </>
  )
}
