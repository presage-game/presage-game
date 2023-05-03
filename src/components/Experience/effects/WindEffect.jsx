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
      if (lineRef.current.position.x >= 80) {
        lineRef.current.position.x = -30
        if (lineRef.current.position.z >= -60) {
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
      <group ref={lineRef}>
        <Line
          points={[
            [-20, 8, -93],
            [-15, 8, -90],
          ]}
          segments
          lineWidth={1.8}
          color={"white"}
        />
        <Line
          points={[
            [-5, 8, -83],
            [0, 8, -80],
          ]}
          segments
          lineWidth={2}
          color={"white"}
        />
        <Line
          points={[
            [10, 8, -43],
            [15, 8, -40],
          ]}
          segments
          lineWidth={2}
          color={"white"}
        />
        <Line
          points={[
            [-5, 8, -23],
            [0, 8, -20],
          ]}
          segments
          lineWidth={2}
          color={"white"}
        />
      </group>
    </>
  )
}
