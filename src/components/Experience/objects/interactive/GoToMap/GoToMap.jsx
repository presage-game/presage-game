import { Box } from "@react-three/drei"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toggleMap, changeMouseVariant } from "@/store/reducers/uiReducer"

export const GoToMap = ({ position, args }) => {
  const dispatch = useDispatch()

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
      onPointerEnter={() => dispatch(changeMouseVariant("large"))}
      onPointerLeave={() => dispatch(changeMouseVariant("default"))}
      onPointerDown={holdClick}
      onPointerUp={() => clearTimeout(timer)}
      dispose={null}
    >
      <meshBasicMaterial transparent opacity={0} />
    </Box>
  )
}
