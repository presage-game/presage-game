import { motion } from "framer-motion"
import "./Cursor.scss"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export const Cursor = () => {
  const { mouseVariant } = useSelector((state) => state.ui)
  const variants = {
    default: {
      scale: 1,
      background: "#f0edd9",
    },
    large: {
      scale: 2,
      background: "#f0edd9",
    },
    buttonHover: {
      background: "#fdc463",
    },
  }
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const updateMousePos = (e) =>
      setMousePos({
        x: e.x,
        y: e.y,
      })

    window.addEventListener("mousemove", updateMousePos)

    return () => window.removeEventListener("mousemove", updateMousePos)
  }, [])

  return (
    <motion.div
      style={{ top: mousePos.y - 10, left: mousePos.x - 10 }}
      variants={variants}
      animate={mouseVariant}
      className="Cursor"
    ></motion.div>
  )
}
