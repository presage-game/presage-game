import { Box, useGLTF, OrthographicCamera } from "@react-three/drei"
import { Pathfinding, PathfindingHelper } from "three-pathfinding"
import { useFrame } from "@react-three/fiber"
import React, { useRef, useMemo, useEffect } from "react"
import { Box3, Object3D } from "three"

export const Scene = ({ goOnScene }) => {
  const map = useGLTF("assets/scenes/map1.glb")
  const voiture = useGLTF("assets/vehicules/defender.glb")
  const navMesh = useGLTF("assets/scenes/navMesh1.glb")
  const camRef = useRef()

  voiture.scene.position.set(5, 0, 0)

  const voitureGrpRef = useRef(null)
  const cubeRef = useRef(null)

  // INITIALIZE THREE-PATHFINDING
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
      carEnterInCube()
      // Remove node from the path we calculated
      navpath.shift()
    }
  }

  function carEnterInCube() {
    if (cubeRef.current) {
      const cube = cubeRef.current
      const car = voitureGrpRef.current
      const carBox = new Box3().setFromObject(car)
      const cubeBox = new Box3().setFromObject(cube)

      if (carBox.intersectsBox(cubeBox)) {
        goOnScene(1)
      }
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
      <Box ref={cubeRef} args={[5, 1, 5]}   position={[11, 1, -15]} />
      <primitive object={pivot} dispose={null} />
      <primitive object={pathfindinghelper} dispose={null} />
      <OrthographicCamera
        makeDefault
        ref={camRef}
        position={[10, 20, 30]}
        zoom={20}
        near={0.1}
        far={100}
      />
    </>
  )
}
