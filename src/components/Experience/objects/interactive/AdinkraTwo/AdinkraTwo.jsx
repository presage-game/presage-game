import { collectAdinkra } from "@/store/reducers/userReducer"
import { Html, Plane } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"

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
    x: ((evt.clientX - rect.right) / (rect.left - rect.right)) * canvas.width,
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

export const AdinkraTwo = ({
  position,
  rotation,
  adinkraFocused,
  setAdinkraFocused,
  nodes,
  Materials,
}) => {
  const dispatch = useDispatch()
  const [localFocused, setLocalFocused] = useState(false)
  const [game, setGame] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const canvasRef = useRef(null)
  const [data, setData] = useState(initialData)

  const handleMDown = (e) => {
    let mouse = getMousePos(canvasRef.current, e)
    let prevX = data.currX !== 0 ? data.currX : mouse.x
    let prevY = data.currY !== 0 ? data.currY : mouse.y
    let currX = mouse.x + canvasRef.current.offsetLeft
    let currY = mouse.y + canvasRef.current.offsetTop
    let ctx = canvasRef.current.getContext("2d", { willReadFrequently: true })

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

      draw(canvasRef.current.getContext("2d", { willReadFrequently: true }), data)
    }
  }

  const clearCanvas = () => {
    setData({
      ...initialData,
    })
    let imgData = canvasRef.current
      .getContext("2d", { willReadFrequently: true })
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
      dispatch(
        collectAdinkra({
          id: 2,
          name: "Adinkra 2",
          description: "Adinkra 2 description good",
        })
      )
      setGameFinished(true)
      setAdinkraFocused(false)
    }
  }

  const initCanvas = () => {
    if (canvasRef.current !== null) {
      let ctx = canvasRef.current.getContext("2d", { willReadFrequently: true })
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      ctx.beginPath()
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      ctx.closePath()
      ctx.globalCompositeOperation = "destination-out"
    }
  }

  useEffect(() => {
    if (localFocused && !gameFinished) {
      if (!game) {
        setGame(true)
      }
    }
  }, [localFocused])

  useEffect(() => {
    setTimeout(() => {
      initCanvas()
    }, [1000])
  }, [])

  return (
    <>
      <group position={position} rotation={rotation} dispose={null}>
        <Plane args={[10, 6]}>
          <meshBasicMaterial transparent color="#ffffff" opacity={0.1} />
          <Html position={[0, 0, 0]} zIndexRange={9} transform>
            <div>
              <canvas
                onClick={() => {
                  if (!adinkraFocused) {
                    setAdinkraFocused(true)
                    setTimeout(() => {
                      setLocalFocused(true)
                    }, 2500)
                  }
                }}
                onMouseDown={(e) => {
                  if (adinkraFocused === true) {
                    handleMDown(e)
                  }
                }}
                onMouseUp={() => {
                  clearCanvas()
                }}
                onMouseMove={(e) => {
                  if (adinkraFocused === true) {
                    handleMMove(e)
                  }
                }}
                ref={canvasRef}
              ></canvas>
            </div>
          </Html>
        </Plane>
        <mesh
          geometry={nodes.Curve003.geometry}
          material={Materials.outlineMaterial}
          position={[0.1, 0, 0.1]}
          rotation={[-Math.PI / 2, Math.PI, 0]}
          scale={4}
        />
      </group>
    </>
  )
}
