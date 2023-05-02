import { Line } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useMotionValue, useSpring } from "framer-motion"
import { useEffect, useRef } from "react"
import { Line3 } from "three"

export const WindEffect = () => {
  const lineRef = useRef(null)
  const val = useMotionValue(0)
  const movement = useSpring(0, { stiffness: 1000, damping: 10, duration: 10 })
  useEffect(() => {
    movement.set(30)
    val.set(30)
  }, [])
  useEffect(() => console.log(val), [val])

  useFrame(() => {
    lineRef.current.position.x = val.get()
    if(lineRef.current.position.x === 30) {
      lineRef.current.position.x = 0
    }
    console.log(val.get())
  })
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
      <Line
        ref={lineRef}
        position={[0, 0, 1]}
        points={[
          [-5, 8, -90],
          [0, 8, -92],
        ]}
        lineWidth={2}
        color={"#BDD9E0"}
      />
    </>
  )
}
