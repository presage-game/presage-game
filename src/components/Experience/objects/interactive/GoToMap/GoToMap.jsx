import { Box } from "@react-three/drei"
import { useDispatch } from "react-redux"
import { toggleMap } from "@/store/reducers/uiReducer"

export const GoToMap = ({ position, args }) => {
  const dispatch = useDispatch()

  return <Box args={args} position={position} onClick={() => dispatch(toggleMap())} />
}
