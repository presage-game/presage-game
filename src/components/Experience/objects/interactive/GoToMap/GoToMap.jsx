import { Box } from "@react-three/drei"
import { useDispatch } from "react-redux"
import { toggleMap, changeMouseVariant } from "@/store/reducers/uiReducer"

export const GoToMap = ({ position, args }) => {
  const dispatch = useDispatch()

  return (
    <Box
      args={args}
      position={position}
      onPointerEnter={() => dispatch(changeMouseVariant("large"))}
      onPointerLeave={() => dispatch(changeMouseVariant("default"))}
      onClick={() => {
        dispatch(changeMouseVariant("default"))
        dispatch(toggleMap())
      }}
      dispose={null}
    >
      <meshBasicMaterial transparent opacity={0.3} />
    </Box>
  )
}
