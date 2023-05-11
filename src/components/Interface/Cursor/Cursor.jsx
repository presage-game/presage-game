import { motion } from "framer-motion"
import "./Cursor.scss"
import { useEffect, useState } from "react"

export const Cursor = () => {
    const [mousePos, setMousePos] = useState({
        x: 0,
        y: 0
    })
    
    useEffect(() => {
        const updateMousePos = (e) => setMousePos({
            x: e.x,
            y: e.y
        })

        window.addEventListener('mousemove', updateMousePos)

        return () => window.removeEventListener('mousemove', updateMousePos)

    }, [])

    return <motion.div style={{ top: mousePos.y - 10, left: mousePos.x - 10 }} className="Cursor">

    </motion.div>
}