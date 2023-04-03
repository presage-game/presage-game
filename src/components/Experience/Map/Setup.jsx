import { useDispatch } from "react-redux"
import { Scene } from "./Scene"
import { changeScene } from "@/store/reducers/userReducer"
import { toggleIsOnMap } from "@/store/reducers/uiReducer"

export const Setup = () => {
  const dispatch = useDispatch()

  const goOnScene = (number) => {
    dispatch(toggleIsOnMap())
    dispatch(changeScene(number))
  }

  return (
    <>
      <Scene goOnScene={goOnScene} />
      <color attach={"background"} args={["#D0FEEF"]} />
      <ambientLight intensity={1} />
      {/* <fog attach={"fog"} args={["black", 25, 120]} /> */}
      {/* <OrbitControls /> */}
    </>
  )
}
