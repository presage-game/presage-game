import { useEffect, useState } from "react"
import { useGLTF } from "@react-three/drei"
import { MeshBasicMaterial } from "three"
import { useDispatch, useSelector } from "react-redux"
import { collectAdinkra } from "@/store/reducers/userReducer"

export const AdinkraOne = ({ adinkraFocused, setAdinkraFocused, Materials, position }) => {
  const { nodes } = useGLTF("/assets/objects/adinkras/adinkraOne.glb")
  const { collectedAdinkras } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [melodic, setMelodic] = useState([])
  const [gameFinished, setGameFinished] = useState(false)

  const goodMelodic = [1, 2, 3, 4]

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
    if (note === 1 || note === 2) {
      rizzPlayer.play()
    } else if (note === 3 || note === 4) {
      pianoPlayer.play()
    }
  }

  const markClick = (note) => {
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
        if (!gameFinished) {
          dispatch(
            collectAdinkra({
              id: 1,
              name: "Adinkra 1",
              description: "Adinkra 1 description good",
            })
          )
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
    const isAdinkraOneCollected = collectedAdinkras.filter((adinkra) => adinkra.id === 1)
    if (isAdinkraOneCollected.length > 0) {
      setGameFinished(true)
    }
  })

  return (
    <>
      <group onClick={checkFocused} position={position} dispose={null}>
        <mesh
          geometry={nodes.Curve.geometry}
          material={new MeshBasicMaterial({ color: "gray" })}
          position={[-3.62, 14.33, -124.01]}
          rotation={[1.25, 0, 0.69]}
          scale={1.35}
        />
        <group
          onClick={() => markClick(1)}
          position={[-9.71, 12.01, -123.09]}
          rotation={[-3.02, 0.75, 2.9]}
          scale={[0.41, 0.64, 0.4]}
        >
          <mesh geometry={nodes.Cube210.geometry} material={Materials.megalithicMaterial} />
          <mesh
            geometry={nodes.Cube210_1.geometry}
            material={melodic.includes(1) ? Materials.selectedMaterial : Materials.outlineMaterial}
          />
        </group>
        <group
          onClick={() => markClick(2)}
          position={[-7.1, 11.98, -125.37]}
          rotation={[-3.04, 0.02, 2.91]}
          scale={[0.47, 0.58, 0.4]}
        >
          <mesh geometry={nodes.Cube302.geometry} material={Materials.megalithicMaterial} />
          <mesh
            geometry={nodes.Cube302_1.geometry}
            material={melodic.includes(2) ? Materials.selectedMaterial : Materials.outlineMaterial}
          />
        </group>
        <group
          onClick={() => markClick(3)}
          position={[-9.72, 12.6, -118.75]}
          rotation={[-1.16, 0.15, -1.22]}
          scale={[-0.28, -0.63, -0.21]}
        >
          <mesh geometry={nodes.Cube094.geometry} material={Materials.megalithicMaterial} />
          <mesh
            geometry={nodes.Cube094_1.geometry}
            material={melodic.includes(3) ? Materials.selectedMaterial : Materials.outlineMaterial}
          />
        </group>
        <group
          onClick={() => markClick(4)}
          position={[-3.32, 12.23, -124.44]}
          rotation={[3.09, 0.98, -3.04]}
          scale={[0.29, 0.82, 0.26]}
        >
          <mesh geometry={nodes.Cube211.geometry} material={Materials.megalithicMaterial} />
          <mesh
            geometry={nodes.Cube211_1.geometry}
            material={melodic.includes(4) ? Materials.selectedMaterial : Materials.outlineMaterial}
          />
        </group>
      </group>
    </>
  )
}

useGLTF.preload("/assets/objects/adinkras/adinkraOne.glb")
