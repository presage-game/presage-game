import { useEffect, useState } from "react"
import { Box } from "@react-three/drei"
import { useDispatch } from "react-redux"

export const AdinkraOne = ({ adinkraFocused, setAdinkraFocused }) => {
  const dispatch = useDispatch()
  const [melodic, setMelodic] = useState([])

  const rizzPlayer = new Audio("/assets/audio/adinkraOne/Rizz.mp3")
  const pianoPlayer = new Audio("/assets/audio/adinkraOne/Piano.mp3")

  const checkFocused = () => {
    console.log("check")
    if (adinkraFocused === false) {
      setAdinkraFocused(true)
    }
  }

  const addNote = (note) => {
    const newMelodic = [...melodic, note]
    setMelodic(newMelodic)
  }

  useEffect(() => {
    console.log(melodic)
    if(melodic.length >= 4) {
        console.log("final melodic")
        // check melodic
        if(true) {
            console.log("good melodic")
        } else {
            console.log("bad melodic")
        }
        setMelodic([])
        setAdinkraFocused(false)
    }
  }, [melodic])

  return (
    <>
      <group onClick={checkFocused} position={[-8, 0, -30]} rotation={[0, -Math.PI / 6, 0]}>
        <Box
          onClick={() => {
            addNote(1)
            rizzPlayer.play()
          }}
          position={[-3, 0, 0]}
        />
        <Box position={[-1, 0, 0]} />
        <Box position={[1, 0, 0]} />
        <Box position={[3, 0, 0]} />
      </group>
    </>
  )
}
