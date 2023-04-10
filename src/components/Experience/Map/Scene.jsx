import React, { useRef, useMemo, useEffect, useState } from "react"
import { resetPinpoint, resetScene } from "@/store/reducers/userReducer"
import { useDispatch, useSelector } from "react-redux"

import { useSpring as useSpringReact } from "react-spring"
import { Box3, Object3D } from "three"
import { Box, useGLTF, OrthographicCamera } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { Pathfinding, PathfindingHelper } from "three-pathfinding"

export const Scene = ({ goOnScene, goOnPinpoint }) => {
  const dispatch = useDispatch()
  const audioPath = "src/assets/audios/chapterOne/pinpoints/pinpoint" // TODO: Update this path

  const { pinpoint: pinpointIndex } = useSelector((state) => state.user)

  const [pinpointAudio, setPinpointAudio] = useState(null)
  const [audioPlaying, setAudioPlaying] = useState(false)

  // Handle map
  const map = useGLTF("assets/scenes/map1.glb")
  const voiture = useGLTF("assets/vehicules/defender.glb")
  const navMesh = useGLTF("assets/scenes/navMesh1.glb")
  const camRef = useRef()

  voiture.scene.position.set(5, 0, 0)

  const voitureGrpRef = useRef(null)
  const cubeRef = useRef([])
  const smallCubeRef = useRef([])

  const [cameraZoom, setCameraZoom] = useState(20)

  const spring = useSpringReact({ cameraZoom })

  // Init Three Pathfinding
  const pathfinding = new Pathfinding()
  const pathfindinghelper = new PathfindingHelper()
  const ZONE = "level1"
  const SPEED = 7
  let navmesh
  let groupID
  let navpath

  navMesh.scene.traverse((node) => {
    if (!navmesh && node.isObject3D && node.children && node.children.length > 0) {
      navmesh = node.children[0]
      pathfinding.setZoneData(ZONE, Pathfinding.createZone(navmesh.geometry))
    }
  })

  const pivot = useMemo(() => new Object3D(), [])

  const followCam = useMemo(() => {
    const o = new Object3D()
    o.position.set(0, 1, 1.5)
    return o
  }, [])

  useEffect(() => {
    camRef.current.lookAt(5, 0, 0)
    followCam.add(camRef.current)
    pivot.add(followCam)

    dispatch(resetScene())
  }, [])

  const click = (e) => {
    let target = e.point
    groupID = pathfinding.getGroup(ZONE, voitureGrpRef.current.position)
    // find closest node to agent, just in case agent is out of bounds
    const closest = pathfinding.getClosestNode(voitureGrpRef.current.position, ZONE, groupID)
    navpath = pathfinding.findPath(closest.centroid, target, ZONE, groupID)
    if (navpath) {
      pathfindinghelper.reset()
      pathfindinghelper.setPlayerPosition(voitureGrpRef.current.position)
      pathfindinghelper.setTargetPosition(target)
      pathfindinghelper.setPath(navpath)
    }
  }

  function move(delta) {
    if (!navpath || navpath.length <= 0) return
    carEnterInCube()

    let targetPosition = navpath[0]
    const distance = targetPosition.clone().sub(voitureGrpRef.current.position)

    if (distance.lengthSq() > 0.05 * 0.05) {
      distance.normalize()
      // Move player to target
      voitureGrpRef.current.position.add(distance.multiplyScalar(delta * SPEED))
      // Rotate player to face target
      voitureGrpRef.current.lookAt(targetPosition)
      pivot.position.lerp(voitureGrpRef.current.position, delta * SPEED)
    } else {
      // Remove node from the path we calculated
      navpath.shift()
    }
  }

  function carEnterInCube() {
    // Handle scenes
    let isSceneIntersecting = false

    cubeRef.current.forEach((item, index) => {
      if (item.scene !== undefined) {
        const box = new Box3().setFromObject(cubeRef.current[index])

        if (box.containsPoint(voitureGrpRef.current.position)) {
          goOnScene(cubeRef.current[index].scene)

          isSceneIntersecting = true
        }
      }
    })

    // Handle pinpoints
    let isPinpointIntersecting = false

    smallCubeRef.current.forEach((item, index) => {
      if (item.pinpoint !== undefined) {
        const box = new Box3().setFromObject(smallCubeRef.current[index])

        if (box.containsPoint(voitureGrpRef.current.position)) {
          goOnPinpoint(smallCubeRef.current[index].pinpoint)

          if (!audioPlaying) {
            const audio = new Audio(`${audioPath}-${smallCubeRef.current[index].pinpoint}.mp3`)
            audio.volume = 1
            audio.play()

            setAudioPlaying(true)
            setPinpointAudio(audio)
          }

          isPinpointIntersecting = true
        }
      }
    })

    // Not intersecting with any scene
    if (!isSceneIntersecting && pinpointIndex === null) {
      dispatch(resetScene())
      console.log("LEAVING A SCENE")
    }

    // Not intersecting with any pinpoint
    if (!isPinpointIntersecting && pinpointAudio !== null) {
      pinpointAudio.pause()
      pinpointAudio.currentTime = 0

      setAudioPlaying(false)
      setPinpointAudio(null)

      dispatch(resetPinpoint())
    }
  }

  useFrame((state, delta) => {
    move(delta)
  })

  return (
    <>
      <primitive object={map.scene} dispose={null} />
      <primitive onClick={(e) => click(e)} object={navMesh.scene} dispose={null} visible={false} />
      <group ref={voitureGrpRef}>
        <primitive object={voiture.scene} dispose={null} />
      </group>
      <Box
        ref={(el) => (cubeRef.current[0] = el)}
        scene={0}
        args={[5, 1, 5]}
        position={[-13, 0, -13]}
      />
      <Box
        ref={(el) => (cubeRef.current[1] = el)}
        scene={1}
        args={[5, 1, 5]}
        position={[10, 0, -80]}
      />
      <Box
        ref={(el) => (cubeRef.current[2] = el)}
        scene={2}
        args={[5, 1, 5]}
        position={[15, 0, -55]}
      />
      <Box
        ref={(el) => (smallCubeRef.current[0] = el)}
        pinpoint={0}
        args={[5, 1, 5]}
        position={[-7, 0, -3]}
        material-color="hotpink"
      />
      <Box
        ref={(el) => (smallCubeRef.current[1] = el)}
        pinpoint={1}
        args={[5, 1, 5]}
        position={[10, 0, -15]}
        material-color="hotpink"
      />
      <primitive object={pivot} dispose={null} />
      <primitive object={pathfindinghelper} dispose={null} />
      <OrthographicCamera
        makeDefault
        ref={camRef}
        position={[15, 15, 15]}
        zoom={cameraZoom}
        near={0.1}
        far={100}
      />
    </>
  )
}
