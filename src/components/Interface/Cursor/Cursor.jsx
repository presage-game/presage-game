import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import "./Cursor.scss"

export const Cursor = () => {
  const { mouseVariant } = useSelector((state) => state.ui)

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

  const innerPastil = document.querySelector(".Cursor__pastil--inner")

  useEffect(() => {
    if (mouseVariant === "large") {
      let timer
      let progress

      const pointerDown = () => {
        timer = setInterval(() => {
          if (isNaN(progress)) progress = 0
          progress++
          innerPastil.style.transform = `translateY(${100 - progress / 2.25}%)`
        }, 10)
      }

      const pointerUp = () => {
        clearInterval(timer)
        progress = null
        innerPastil.style.transform = `translateY(${100}%)`
      }

      window.addEventListener("pointerdown", pointerDown)
      window.addEventListener("pointerup", pointerUp)

      return () => {
        window.removeEventListener("pointerdown", pointerDown)
        window.removeEventListener("pointerup", pointerUp)
        innerPastil.style.transform = `translateY(${100}%)`
        clearInterval(timer)
      }
    }
  }, [mouseVariant])

  return (
    <div style={{ top: mousePos.y - 7.5, left: mousePos.x - 7.5 }} className="Cursor">
      <svg
        width="26"
        height="17"
        viewBox="0 0 26 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`Cursor__svg ${mouseVariant === "large" ? "Cursor__svg--active" : ""}`}
      >
        <path
          d="M13 0.722168L25 12.7222L21.6667 16.0555L13 7.38883L4.33333 16.0555L1 12.7222L13 0.722168Z"
          fill="#FDC463"
          stroke="#2E2724"
        />
      </svg>
      <div className={`Cursor__pastil ${mouseVariant === "large" ? "Cursor__pastil--active" : ""}`}>
        <div className="Cursor__pastil--inner"></div>
        <svg
          width="14"
          height="26"
          viewBox="0 0 14 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.00001 25.5L7 1.5M7 1.5L0.999999 8.5M7 1.5L13 8.5" stroke="#2E2724" />
        </svg>
      </div>
    </div>
  )
}
