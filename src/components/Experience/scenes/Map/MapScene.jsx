import { OrbitControls, useGLTF, useHelper } from "@react-three/drei"
import { Pathfinding, PathfindingHelper } from "three-pathfinding"
import { useFrame } from "@react-three/fiber"
import React, { useRef } from "react"
import useFollowCam from './useFollowCam'

export const MapScene = () => {
  const map = useGLTF("assets/scenes/map1.glb")
  const voiture = useGLTF("assets/vehicules/defender.glb")
  const navMesh = useGLTF("assets/scenes/navMesh1.glb")
  const { pivot } = useFollowCam()

  voiture.scene.position.set(5, 0, 0)

  const voitureGrpRef = useRef(null)

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
      // Remove node from the path we calculated
      navpath.shift()
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
      <primitive object={pathfindinghelper} dispose={null} />
    </>
  )
}
