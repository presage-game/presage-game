import { Box } from "@react-three/drei"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toggleMap, changeMouseVariant } from "@/store/reducers/uiReducer"

export const GoToMap = ({ position, args, disable = false }) => {
  const dispatch = useDispatch()
  const { blackBarsStatus } = useSelector((state) => state.ui)

  const [timer, setTimer] = useState(null)

  const holdClick = () => {
    setTimer(
      setTimeout(() => {
        dispatch(toggleMap())
        dispatch(changeMouseVariant("default"))
      }, 750)
    )
  }

  return (
    <Box
      args={args}
      position={position}
      onPointerEnter={() => !disable && dispatch(changeMouseVariant("large"))}
      onPointerLeave={() => !disable && dispatch(changeMouseVariant("default"))}
      onPointerDown={() => {
        if (blackBarsStatus === "opened" && !disable) {
          holdClick()
        }
      }}
      onPointerUp={() => !disable && clearTimeout(timer)}
      dispose={null}
    >
      <meshBasicMaterial transparent opacity={0} />
    </Box>
  )
}
