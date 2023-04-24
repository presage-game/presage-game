import { Model } from "./Model"

export const Scene = ({ variant, setVariant }) => {
  return (
    <>
      <Model position={[9, -15, 93]} variant={variant} setVariant={setVariant} />
    </>
  )
}
