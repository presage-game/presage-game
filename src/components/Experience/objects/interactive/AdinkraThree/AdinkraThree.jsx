import { Box } from "@react-three/drei"
import { motion } from "framer-motion-3d"
import { useRef, useState } from "react"

export const AdinkraThree = ({ switchLerp }) => {
  const [active, setActive] = useState(false)
  const [finished, setFinished] = useState(false)
  const RightBoxRef = useRef()

  const LeftBoxVariants = {
    on: {
      x: 7,
      z: -22,
    },
    off: {
      x: 4,
      z: -19,
    },
  }

  const RightBoxVariants = {
    on: {
      x: 9,
      z: -22,
    },
    off: {
      x: 13,
      z: -19,
    },
  }

  const TransitionOptions = {
    type: "tween",
    duration: 4,
  }

  const holdComplete = () => {
    if (active && RightBoxRef.current.position.x === 9) {
      console.log("hold fini")
      setFinished(true)
    } else {
      console.log("hold pas terminé")
    }
  }

  return (
    <>
      <group>
        <motion.mesh
          transition={TransitionOptions}
          animate={active ? "on" : "off"}
          variants={RightBoxVariants}
          onAnimationComplete={holdComplete}
          position={[13, -1, -19]}
          ref={RightBoxRef}
        >
          <boxGeometry args={[2, 2]} />
          <meshBasicMaterial color={finished ? "green" : "white"} />
        </motion.mesh>
        <motion.mesh
          transition={TransitionOptions}
          animate={active ? "on" : "off"}
          variants={LeftBoxVariants}
          position={[4, -1, -19]}
        >
          <boxGeometry args={[2, 2]} />
          <meshBasicMaterial color={finished ? "green" : "white"} />
        </motion.mesh>
        <Box
          position={[8, -1, -19]}
          onPointerDown={() => {
            switchLerp(true)
            if (!finished) {
              setActive(true)
            }
          }}
          onPointerUp={() => {
            switchLerp(false)
            if (!finished) {
              setActive(false)
            }
          }}
        />
      </group>
    </>
  )
}
