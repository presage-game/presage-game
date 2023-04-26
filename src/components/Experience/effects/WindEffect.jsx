import { Line } from "@react-three/drei"
import { useSpring } from "framer-motion"
import { useEffect } from "react"

export const WindEffect = () => {
  const movement = useSpring(0, { duration: 1 })
  const catPoints = [
    [movement.get() - 5, 8, -90],
    [movement.get(), 8, -92],
  ]

  useEffect(() => {
    catPoints[0] = [
      [movement.get() - 5, 8, -90],
      [movement.get(), 8, -92],
    ]
  }, [movement])

  useEffect(() => {
    movement.set(30)
  }, [])

  /*
  <CatmullRomLine
      points={catPoints}
      closed={false} // Default
      curveType="centripetal" // One of "centripetal" (default), "chordal", or "catmullrom"
      tension={0.5}
      color={"red"}
      segments={20}
      lineWidth={12}
      dashed={true}
    />
    <Line points={catPoints} dashed={false} lineWidth={100} />
  */

  return (
    <>
      <Line points={catPoints} lineWidth={2} color={"#BDD9E0"} />
    </>
  )
}
