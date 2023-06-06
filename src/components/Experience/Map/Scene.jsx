import React, { useRef, useMemo, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Box3, Object3D, Quaternion, Vector3, Raycaster, Vector2 } from "three"
import { Box, useGLTF, OrthographicCamera } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { Pathfinding, PathfindingHelper } from "three-pathfinding"
import { Car } from "./Car"
import { Model } from "./Model"

export const Scene = ({
  goOnScene,
  goOnPinpoint,
  resetScene,
  resetPinpoint,
  intersectScene,
  intersectPinpoint,
}) => {
  const { pinpoint: pinpointIndex, scene: sceneIndex } = useSelector((state) => state.map)

  const navMesh = useGLTF("assets/scenes/navMesh.glb")
  const camRef = useRef()
  const navMeshRef = useRef()

  const [startSound] = useState(() => new Audio("assets/vehicules/truck/start.mp3"))

  const [pointerDown, setPointerDown] = useState(false)
  let speed = 1

  const voitureGrpRef = useRef(null)
  const cubeRef = useRef([])
  const smallCubeRef = useRef([])

  // Init Three Pathfinding
  const pathfinding = useMemo(() => new Pathfinding(), [])
  const pathfindinghelper = useMemo(() => new PathfindingHelper(), [])
  const ZONE = "level1"
  const MAX_SPEED = 3.5
  let navPath = null

  navMesh.scene.traverse((node) => {
    if (node.isObject3D && node.children && node.children.length > 0) {
      pathfinding.setZoneData(ZONE, Pathfinding.createZone(node.children[0].geometry))
    }
  })

  const pivot = useMemo(() => new Object3D(), [])

  const followCam = useMemo(() => {
    const o = new Object3D()
    o.position.set(0, 1, 1.5)
    return o
  }, [])

  const raycaster = useMemo(() => new Raycaster(), [])

  useEffect(() => {
    camRef.current.lookAt(0, 0, 0)
    followCam.add(camRef.current)
    pivot.add(followCam)
    resetScene()
    startSound.currentTime = 0
    startSound.volume = 0.05
    startSound.play()
  }, [])

  const click = (e, delta) => {
    let target = e.point
    let groupID = pathfinding.getGroup(ZONE, voitureGrpRef.current.position)
    // find closest node to agent, just in case agent is out of bounds
    const closest = pathfinding.getClosestNode(voitureGrpRef.current.position, ZONE, groupID)

    if (pathfinding.findPath(closest.centroid, target, ZONE, groupID) !== null) {
      navPath = pathfinding.findPath(closest.centroid, target, ZONE, groupID)
    }

    if (navPath) {
      pathfindinghelper.reset()
      pathfindinghelper.setPlayerPosition(voitureGrpRef.current.position)
      pathfindinghelper.setTargetPosition(target)
      pathfindinghelper.setPath(navPath)
    }

    move(delta)
  }

  function move(delta) {
    if (!navPath || navPath.length <= 0) return
    carEnterInCube()

    let targetPosition = navPath[0]
    const distance = targetPosition.clone().sub(voitureGrpRef.current.position)

    // anti jitter
    if (distance.length() < 0.1) {
      navPath.shift()
      return
    }

    if (navPath.length > 1 || distance.length() > 0.5) {
      if (speed < MAX_SPEED) {
        speed += 0.05
      }
      distance.normalize()
      // Move player to target
      voitureGrpRef.current.position.add(distance.multiplyScalar(delta * speed))
      // do a slowly turn to the target direction
      const targetRotation = new Quaternion().setFromUnitVectors(
        new Vector3(0, 0, 1),
        new Vector3(distance.x, 0, distance.z).normalize()
      )
      voitureGrpRef.current.quaternion.slerp(targetRotation, delta * speed)

      // Move camera to target
      pivot.position.lerp(voitureGrpRef.current.position, delta * speed)
    } else {
      // Remove node from the path we calculated
      navPath.shift()
    }
  }

  function carEnterInCube() {
    // Handle scenes
    let isSceneIntersecting = false

    cubeRef.current.forEach((item, index) => {
      if (item.scene !== undefined) {
        const box = new Box3().setFromObject(cubeRef.current[index])

        if (box.containsPoint(voitureGrpRef.current.position)) {
          sceneIndex !== cubeRef.current[index].scene && goOnScene(cubeRef.current[index].scene)

          isSceneIntersecting = true
          intersectScene(true)
        }
      }
    })

    // Handle pinpoints
    let isPinpointIntersecting = false

    smallCubeRef.current.forEach((item, index) => {
      if (item.pinpoint !== undefined) {
        const box = new Box3().setFromObject(smallCubeRef.current[index])

        if (box.containsPoint(voitureGrpRef.current.position)) {
          pinpointIndex !== smallCubeRef.current[index].pinpoint &&
            goOnPinpoint(smallCubeRef.current[index].pinpoint)

          isPinpointIntersecting = true
          intersectPinpoint(true)
        }
      }
    })

    // Not intersecting with any scene
    if (!isSceneIntersecting) {
      intersectScene(false)
      resetScene()
    }

    // Not intersecting with any pinpoint
    if (!isPinpointIntersecting) {
      intersectPinpoint(false)
      resetPinpoint()
    }
  }

  useFrame((state, delta) => {
    if (pointerDown) {
      let pointer = new Vector2(state.mouse.x, state.mouse.y)
      raycaster.setFromCamera(pointer, state.camera)
      const objects = raycaster.intersectObjects([navMeshRef.current], true)
      if (objects && objects.length > 0) {
        click({ point: objects[0].point }, delta)
      } else {
        click({ point: new Vector3(0, 0, 0) }, delta)
      }
    }
  })

  return (
    <>
      <Model onPointerUp={() => setPointerDown(false)} visible={true} />
      <primitive
        onPointerDown={() => setPointerDown(true)}
        object={navMesh.scene}
        visible={true}
        ref={navMeshRef}
        dispose={null}
      />
      <group ref={voitureGrpRef} dispose={null}>
        <Car animationsName={pointerDown ? "Run" : null} />
      </group>
      <Box
        ref={(el) => (cubeRef.current[0] = el)}
        scene={0}
        args={[-2, 1, 2]}
        position={[-15, 0.1, 13]}
        dispose={null}
      />
      <Box
        ref={(el) => (cubeRef.current[1] = el)}
        scene={1}
        args={[-2, 1, 2]}
        position={[-13.5, 0.1, -4.5]}
        dispose={null}
      />
      <Box
        ref={(el) => (cubeRef.current[2] = el)}
        scene={2}
        args={[-2, 1, 2]}
        position={[0, 0.1, -5]}
        dispose={null}
      />
      <Box
        ref={(el) => (smallCubeRef.current[0] = el)}
        pinpoint={0}
        args={[2, 1, 2]}
        position={[-10, 0.1, -3]}
        material-color="hotpink"
        dispose={null}
      />
      <Box
        ref={(el) => (smallCubeRef.current[1] = el)}
        pinpoint={1}
        args={[2, 1, 2]}
        position={[10, 0.1, -15]}
        material-color="hotpink"
        dispose={null}
      />
      <Box
        ref={(el) => (smallCubeRef.current[2] = el)}
        pinpoint={2}
        args={[2, 1, 2]}
        position={[12, 0.1, -12]}
        material-color="red"
        dispose={null}
      />
      <Box
        ref={(el) => (smallCubeRef.current[3] = el)}
        pinpoint={3}
        args={[2, 1, 2]}
        position={[14, 0.1, -14]}
        material-color="green"
        dispose={null}
      />
      <primitive object={pivot} dispose={null} />
      {/* <primitive object={pathfindinghelper} dispose={null} /> */}
      <OrthographicCamera
        makeDefault
        ref={camRef}
        position={[15, 15, 15]}
        zoom={125}
        near={0}
        far={60}
        dispose={null}
      />
    </>
  )
}
