import { useEffect, useState } from "react"
import { Box } from "@react-three/drei"
import { useDispatch, useSelector } from "react-redux"
import { collectAdinkra } from "@/store/reducers/userReducer"

export const AdinkraOne = ({ adinkraFocused, setAdinkraFocused }) => {
  const { collectedAdinkras } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [melodic, setMelodic] = useState([])
  const [gameFinished, setGameFinished] = useState(false)

  const goodMelodic = [1,2,3,4]

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
      if (JSON.stringify(melodic) === JSON.stringify(goodMelodic)) {
        console.log("good melodic")
        if(!gameFinished) {
          dispatch(collectAdinkra({
            id: 1,
            name: "Adinkra 1",
            description: "Adinkra 1 description good",
          }))
          setGameFinished(true)
        }
      } else {
        console.log("bad melodic")
      }
      setMelodic([])
      setAdinkraFocused(false)
    }
  }, [melodic])

  useEffect(() => {
    const AdinkraOneCollected = collectedAdinkras.filter((adinkra) => adinkra.id === 1)
    if(AdinkraOneCollected.length > 0) {
      setGameFinished(true)
    }
  })

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
