import { MapScene } from "./MapScene"

export const Scene = ({ goOnScene }) => {
  return (
    <>
      <color attach={"background"} args={["#D0FEEF"]} />
      <ambientLight intensity={1} />
      {/* <fog attach={"fog"} args={["black", 25, 120]} /> */}
      <MapScene goOnScene={goOnScene} />
      {/* <OrbitControls /> */}
    </>
  )
}
