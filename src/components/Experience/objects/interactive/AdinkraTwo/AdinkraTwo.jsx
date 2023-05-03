import { Html, Plane, Box, useTexture, Decal } from "@react-three/drei"
import { useRef, useState } from "react"

const initialData = {
  prevX: 0,
  currX: 0,
  prevY: 0,
  currY: 0,
  dot_flag: false,
  flag: false,
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect()
  return {
    x: ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
    y: ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
  }
}

const draw = (ctx, data) => {
  let prevX = data.prevX
  let currX = data.currX
  let prevY = data.prevY
  let currY = data.currY
  ctx.beginPath()
  ctx.moveTo(prevX, prevY)
  ctx.lineTo(currX, currY)
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.closePath()
}

export const AdinkraTwo = ({ switchLerp }) => {
  const sankofaTexture = useTexture("/assets/images/sankofa.png")
  const [game, setGame] = useState(false)
  const canvasRef = useRef(null)
  const [data, setData] = useState(initialData)

  const handleMDown = (e) => {
    let mouse = getMousePos(canvasRef.current, e)
    let prevX = data.currX !== 0 ? data.currX : mouse.x
    let prevY = data.currY !== 0 ? data.currY : mouse.y
    let currX = mouse.x - canvasRef.current.offsetLeft
    let currY = mouse.y - canvasRef.current.offsetTop
    let ctx = canvasRef.current.getContext("2d")

    let flag = true
    let dot_flag = true
    if (dot_flag) {
      ctx.beginPath()
      ctx.fillRect(currX, currY, 3, 3)
      ctx.closePath()
      dot_flag = false
    }
    setData({
      prevX: prevX,
      prevY: prevY,
      currX: currX,
      currY: currY,
      flag: flag,
      dot_flag: dot_flag,
    })
  }

  const handleMMove = (e) => {
    let flag = data.flag
    let mouse = getMousePos(canvasRef.current, e)
    if (flag === true && e.buttons === 1) {
      let prevX = data.currX
      let prevY = data.currY
      let currX = mouse.x - canvasRef.current.offsetLeft
      let currY = mouse.y - canvasRef.current.offsetTop

      setData({
        ...data,
        prevX: prevX,
        prevY: prevY,
        currX: currX,
        currY: currY,
      })

      draw(canvasRef.current.getContext("2d"), data)
    }
  }

  const clearCanvas = () => {
    setData({
      ...initialData,
    })
    let imgData = canvasRef.current
      .getContext("2d")
      .getImageData(0, 0, canvasRef.current.width, canvasRef.current.height, { colorSpace: "srgb" })
    let red = []
    let green = []
    let blue = []
    let type = 0
    imgData.data.map((color) => {
      if (type === 0) {
        red.push(color)
      } else if (type === 1) {
        green.push(color)
      } else {
        blue.push(color)
      }
      type++
      if (type > 2) {
        type = 0
      }
    })
    let blackpixels = 0
    red.map((color, index) => {
      if (color === 0) {
        if (green[index] === 0) {
          if (blue[index] === 0) {
            blackpixels++
          }
        }
      }
    })

    if (blackpixels < 26500) {
      console.log("perdu")
    } else {
      console.log("gagné")
    }
  }

  const initCanvas = () => {
    if (canvasRef.current !== null) {
      let ctx = canvasRef.current.getContext("2d")
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      ctx.beginPath()
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      ctx.closePath()
      ctx.globalCompositeOperation = "destination-out"
    }
  }

  return (
    <>
      <Plane args={[10, 6]} rotation={[0, 0, 0]} position={[8, 0.8, -20]}>
        <meshBasicMaterial transparent color="#ffffff" opacity={0.1} />
        <Html className={classes.main} position={[0, 0, 0]} transform>
          <div
            onPointerEnter={() => {
              if (!game) {
                initCanvas()
                setGame(true)
              }
              switchLerp(true)
            }}
            onPointerLeave={() => switchLerp(false)}
            className={classes.container}
          >
            <canvas
              onMouseDown={(e) => handleMDown(e)}
              onMouseUp={() => {
                clearCanvas()
              }}
              onMouseMove={(e) => handleMMove(e)}
              className={classes.canvas}
              ref={canvasRef}
            ></canvas>
          </div>
        </Html>
      </Plane>
      <Box args={[2, 2]} position={[8, 0, -22]} rotation={[0, 0, 0]}>
        <meshBasicMaterial />
        <Decal position={[0, 0, 0.5]} map={sankofaTexture} />
      </Box>
    </>
  )
}
