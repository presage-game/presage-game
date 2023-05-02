import { Line } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { getMaterials } from "@/helpers/materials/Materials"

export const WindEffect = () => {
  const lineRef = useRef(null)
  const [Materials, setMaterials] = useState(null)

  useEffect(() => {
    getMaterials().then((result) => setMaterials(result))
  }, [])

  useFrame(() => {
    if (Materials !== null) {
      lineRef.current.position.x += 0.5
      lineRef.current.position.z += 0.3
      if (lineRef.current.position.x >= 60) {
        lineRef.current.position.x = -30
        if (lineRef.current.position.z >= 30) {
          lineRef.current.position.z = -90
        }
      }
    }
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

  if (Materials === null) {
    return <></>
  }

  return (
    <>
      <Line
        ref={lineRef}
        points={[
          [-5, 8, -93],
          [0, 8, -90],
        ]}
        segments
        lineWidth={2}
        material={Materials.outlineMaterial}
      />
    </>
  )
}
