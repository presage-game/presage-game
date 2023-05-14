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

  const playSound = (note) => {
    if(note === 1 || note === 2) {
      rizzPlayer.play()
    } else if (note === 3 || note === 4) {
      pianoPlayer.play()
    }
    
  }

  const signClick = (note) => {
    if (adinkraFocused) {
      addNote(note)
      playSound(note)
    }
  }

  useEffect(() => {
    console.log(melodic)
    if (melodic.length >= 4) {
      console.log("final melodic")
      // check melodic
      if (true) {
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
        <Box onClick={() => signClick(1)} position={[-3, 0, 0]}>
          <meshBasicMaterial color={melodic.includes(1) ? "green" : "white"} />
        </Box>
        <Box onClick={() => signClick(2)} position={[-1, 0, 0]}>
          <meshBasicMaterial color={melodic.includes(2) ? "green" : "white"} />
        </Box>
        <Box onClick={() => signClick(3)} position={[1, 0, 0]}>
          <meshBasicMaterial color={melodic.includes(3) ? "green" : "white"} />
        </Box>
        <Box onClick={() => signClick(4)} position={[3, 0, 0]}>
          <meshBasicMaterial color={melodic.includes(4) ? "green" : "white"} />
        </Box>
      </group>
    </>
  )
}
