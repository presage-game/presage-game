import { useEffect, useState } from "react"
import { useGLTF } from "@react-three/drei"
import { useDispatch, useSelector } from "react-redux"
import { collectAdinkra } from "@/store/reducers/userReducer"
import { Material, MeshBasicMaterial } from "three"
import { changeVolume } from "@/store/reducers/audioReducer"

export const AdinkraOne = ({ adinkraFocused, setAdinkraFocused, Materials, position }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [stoneOneIsHovered, setStoneOneIsHovered] = useState(false)
  const [stoneTwoIsHovered, setStoneTwoIsHovered] = useState(false)
  const [stoneThreeIsHovered, setStoneThreeIsHovered] = useState(false)
  const [stoneFourIsHovered, setStoneFourIsHovered] = useState(false)
  const selectedStoneOutlineMaterial = (stone) =>
    stone ? Materials.selectedMaterial : Materials.outlineMaterial
  const selectedOutlineMaterial = isHovered ? Materials.selectedMaterial : Materials.outlineMaterial
  const selectedMelodicMaterial = new MeshBasicMaterial({ color: "green" })

  const { nodes } = useGLTF("/assets/objects/adinkras/adinkraOne.glb")
  const { adinkras } = useSelector((state) => state.user)
  const { volume, isMuted } = useSelector((state) => state.audio)
  const dispatch = useDispatch()
  const [melodic, setMelodic] = useState([])
  const [gameFinished, setGameFinished] = useState(false)

  const goodMelodic = [1, 3, 2]

  const firstPlayer = new Audio("/audios/scenes/1/adinkraOne/1.mp3")
  const secondPlayer = new Audio("/audios/scenes/1/adinkraOne/2.mp3")
  const thirdPlayer = new Audio("/audios/scenes/1/adinkraOne/3.mp3")

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
    if (note === 1) {
      firstPlayer.play()
    } else if (note === 2) {
      secondPlayer.play()
    } else if (note === 3) {
      thirdPlayer.play()
    }
  }

  const playGoodMelodic = () => {
    dispatch(changeVolume(0.6))
    setTimeout(
      () =>
        goodMelodic.forEach((note, index) => setTimeout(() => playSound(note), 800 * (index + 1))),
      400
    )
    setTimeout(() => {
      dispatch(changeVolume(1))
    }, 3000)
  }

  const markClick = (note) => {
    if (adinkraFocused) {
      addNote(note)
      playSound(note)
    }
  }

  useEffect(() => {
    console.log(melodic)
    if (melodic.length >= 3) {
      console.log("final melodic")
      // check melodic
      if (JSON.stringify(melodic) === JSON.stringify(goodMelodic)) {
        console.log("good melodic")
        dispatch(collectAdinkra(0))
        if (!gameFinished) {
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
    if (!isMuted) {
      firstPlayer.volume = volume
      secondPlayer.volume = volume
    } else {
      firstPlayer.volume = 0.01
      secondPlayer.volume = 0.01
    }
  }, [volume, isMuted])

  useEffect(() => {
    const isAdinkraOneCollected = adinkras.filter((adinkra) => adinkra.id === 1)
    if (isAdinkraOneCollected.length > 0) {
      setGameFinished(true)
    }
  })

  return (
    <>
      <group
        onClick={checkFocused}
        onPointerEnter={() => !adinkraFocused && setIsHovered(true)}
        onPointerLeave={() => !adinkraFocused && setIsHovered(false)}
        position={position}
        dispose={null}
      >
        <mesh
          geometry={nodes.Curve.geometry}
          material={Materials.adinkraMaterial}
          position={[-3.62, 14.33, -124.01]}
          rotation={[1.25, 0, 0.69]}
          scale={1.35}
        />
        <group
          onClick={(e) => {
            e.stopPropagation()
            !melodic.includes(1) && markClick(1)
          }}
          position={[-9.71, 12.01, -123.09]}
          rotation={[-3.02, 0.75, 2.9]}
          scale={[0.41, 0.64, 0.4]}
          onPointerEnter={() => setStoneOneIsHovered(true)}
          onPointerLeave={() => setStoneOneIsHovered(false)}
        >
          <mesh geometry={nodes.Cube210.geometry} material={Materials.megalithicMaterial} />
          <mesh
            geometry={nodes.Cube210_1.geometry}
            material={
              !adinkraFocused
                ? selectedOutlineMaterial
                : melodic.includes(1)
                ? selectedMelodicMaterial
                : selectedStoneOutlineMaterial(stoneOneIsHovered)
            }
          />
        </group>
        <group
          onClick={() => !melodic.includes(2) && markClick(2)}
          position={[-7.1, 11.98, -125.37]}
          rotation={[-3.04, 0.02, 2.91]}
          scale={[0.47, 0.58, 0.4]}
          onPointerEnter={() => setStoneTwoIsHovered(true)}
          onPointerLeave={() => setStoneTwoIsHovered(false)}
        >
          <mesh geometry={nodes.Cube302.geometry} material={Materials.megalithicMaterial} />
          <mesh
            geometry={nodes.Cube302_1.geometry}
            material={
              !adinkraFocused
                ? selectedOutlineMaterial
                : melodic.includes(2)
                ? selectedMelodicMaterial
                : selectedStoneOutlineMaterial(stoneTwoIsHovered)
            }
          />
        </group>
        <group
          onClick={() => !melodic.includes(3) && markClick(3)}
          position={[-9.72, 12.6, -118.75]}
          rotation={[-1.16, 0.15, -1.22]}
          scale={[-0.28, -0.63, -0.21]}
          onPointerEnter={() => setStoneThreeIsHovered(true)}
          onPointerLeave={() => setStoneThreeIsHovered(false)}
        >
          <mesh geometry={nodes.Cube094.geometry} material={Materials.megalithicMaterial} />
          <mesh
            geometry={nodes.Cube094_1.geometry}
            material={
              !adinkraFocused
                ? selectedOutlineMaterial
                : melodic.includes(3)
                ? selectedMelodicMaterial
                : selectedStoneOutlineMaterial(stoneThreeIsHovered)
            }
          />
        </group>
        <group
          onClick={playGoodMelodic}
          position={[-3.32, 12.23, -124.44]}
          rotation={[3.09, 0.98, -3.04]}
          scale={[0.29, 0.82, 0.26]}
          onPointerEnter={() => setStoneFourIsHovered(true)}
          onPointerLeave={() => setStoneFourIsHovered(false)}
        >
          <mesh geometry={nodes.Cube211.geometry} material={Materials.megalithicMaterial} />
          <mesh
            geometry={nodes.Cube211_1.geometry}
            material={
              adinkraFocused
                ? selectedStoneOutlineMaterial(stoneFourIsHovered)
                : selectedOutlineMaterial
            }
          />
        </group>
      </group>
    </>
  )
}

useGLTF.preload("/assets/objects/adinkras/adinkraOne.glb")
