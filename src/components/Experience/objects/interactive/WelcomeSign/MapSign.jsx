/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 map_sign.glb --transform
*/

import React, { useState, useEffect } from "react"
import { getMaterials } from "@/helpers/materials/Materials"
import { MeshToonMaterial } from "three"
import { useGLTF, useTexture } from "@react-three/drei"

export function Model({ position, rotation, mapFocused, mapHovered, setMapHovered, onMapClick }) {
  const { nodes, materials } = useGLTF("assets/objects/signs/map_sign.glb")
  const mapTexture = useTexture("assets/images/nyalaande_map.jpg")
  mapTexture.flipY = false

  const [Materials, setMaterials] = useState(null)

  useEffect(() => {
    getMaterials().then((result) => setMaterials(result))
  }, [])

  if (Materials === null) {
    return <group></group>
  }

  const selectedOutlineMaterial =
    mapHovered && !mapFocused ? Materials.selectedMaterial : Materials.outlineMaterial

  return (
    <group position={position} rotation={rotation} dispose={null}>
      <group position={[-0.17, 0.44, -0.26]} rotation={[0, 0, -0.02]} scale={[-0.01, 0.01, 0.01]}>
        <mesh geometry={nodes.Mesh041.geometry} material={Materials.fenceMaterial} />
        <mesh geometry={nodes.Mesh041_1.geometry} material={selectedOutlineMaterial} />
      </group>
      <group position={[-0.1, 4.47, -0.19]} rotation={[0, 0, -0.02]} scale={[-0.01, 0.01, 0.01]}>
        <mesh geometry={nodes.Mesh040.geometry} material={Materials.fenceMaterial} />
        <mesh geometry={nodes.Mesh040_1.geometry} material={selectedOutlineMaterial} />
      </group>
      <group position={[-0.14, 2.44, -0.2]} rotation={[0, 0, -0.02]} scale={[-0.01, 0.01, 0.01]}>
        <mesh geometry={nodes.Mesh040.geometry} material={Materials.fenceMaterial} />
        <mesh geometry={nodes.Mesh040_1.geometry} material={selectedOutlineMaterial} />
      </group>
      <group
        onClick={onMapClick}
        onPointerEnter={() => setMapHovered(true)}
        onPointerLeave={() => setMapHovered(false)}
        position={[0.06, 3.07, -0.04]}
        rotation={[0, 0, -0.02]}
        scale={[0.12, 2.55, -1.6]}
      >
        <mesh
          geometry={nodes.Cube197.geometry}
          material={new MeshToonMaterial({ map: mapTexture })}
        />
        <mesh geometry={nodes.Cube197_1.geometry} material={selectedOutlineMaterial} />
      </group>
      <group position={[0.06, 3.07, -0.04]} rotation={[0, 0, -0.02]} scale={[0.12, 2.55, -1.6]}>
        <mesh geometry={nodes.Cube196.geometry} material={Materials.fenceMaterial} />
        <mesh geometry={nodes.Cube196_1.geometry} material={selectedOutlineMaterial} />
      </group>
      <group position={[0.67, 5.37, 0.78]} rotation={[-3.14, 0, 1.59]} scale={[0.03, 0.23, 0.03]}>
        <mesh geometry={nodes.Cube194.geometry} material={Materials.fenceMaterial} />
        <mesh geometry={nodes.Cube194_1.geometry} material={selectedOutlineMaterial} />
      </group>
      <group position={[0.67, 5.37, -0.86]} rotation={[-3.14, 0, 1.59]} scale={[0.03, 0.23, 0.03]}>
        <mesh geometry={nodes.Cube194.geometry} material={Materials.fenceMaterial} />
        <mesh geometry={nodes.Cube194_1.geometry} material={selectedOutlineMaterial} />
      </group>
    </group>
  )
}

useGLTF.preload("assets/objects/signs/map_sign.glb")
