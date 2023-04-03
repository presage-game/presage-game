import { Box } from "@react-three/drei"
import { motion } from "framer-motion-3d"
import { useState } from "react"

export const AdinkraThree = ({ switchLerp }) => {
  const [active, setActive] = useState(false)

  const LeftBoxVariants = {
    on: {
      x: 6,
      z: -17,
    },
    off: {
      x: 4,
      z: -19,
    },
  }

  const RightBoxVariants = {
    on: {
      x: 11,
      z: -17,
    },
    off: {
      x: 13,
      z: -19,
    },
  }

  return (
    <>
      <group>
        <motion.mesh animate={active ? "on" : "off"} variants={RightBoxVariants} position={[13, -1, -19]}>
          <boxGeometry args={[2, 2]} />
          <meshBasicMaterial />
        </motion.mesh>
        <motion.mesh animate={active ? "on" : "off"} variants={LeftBoxVariants} position={[4, -1, -19]}>
          <boxGeometry args={[2, 2]} />
          <meshBasicMaterial />
        </motion.mesh>
        <Box
          position={[8, -1, -19]}
          onPointerDown={() => {
            switchLerp(true)
            setActive(true)
          }}
          onPointerUp={() => {
            switchLerp(false)
            setActive(false)
          }}
        />
      </group>
    </>
  )
}
