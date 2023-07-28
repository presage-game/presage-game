import { useFrame } from "@react-three/fiber"
import { MathUtils } from "three"
import { useState, useRef } from "react"

const IslandLerp = (current, add = 0, speed = 0.05) => MathUtils.lerp(current, add, speed)

export const SentierIslands = ({ Materials, nodes }) => {
  const islandRef = useRef(null)

  useFrame((state, delta) => {
    if (islandRef.current) {
      if (islandRef.current.position.y < 1) {
        islandRef.current.position.y = IslandLerp(islandRef.current.position.y, Math.sin(state.clock.elapsedTime) / 2, 0.25 * delta)
      }
    }
  })

  return (
    <>
      <group ref={islandRef}>
        <group position={[-9.757, 0.685, -7.897]} rotation={[-0.109, -0.792, -0.061]} scale={0.124}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle043.geometry}
            material={Materials.leafMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle043_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-9.706, 0.593, -7.925]} rotation={[-0.14, -1.064, 3.059]} scale={0.0004}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh131.geometry}
            material={Materials.stoneMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh131_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group
          position={[-9.68, 0.682, -7.919]}
          rotation={[0.015, 0.033, -0.035]}
          scale={[0.012, 0.012, 0.017]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere018.geometry}
            material={Materials.leafMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere018_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-9.706, 0.593, -7.925]} rotation={[-0.14, -1.064, 3.059]} scale={0}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh131.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh131_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-9.721, 0.638, -7.945]} rotation={[-0.722, 1.477, 0.73]} scale={0.002}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh132.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh132_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-9.757, 0.733, -7.95]} rotation={[-0.265, 1.498, 0.222]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh133.geometry}
            material={Materials.treeMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh133_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
      </group>
      <>
        <group position={[-12.6, 0.397, -5.023]} rotation={[2.864, 1.178, -2.855]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh030.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh030_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-12.596, 0.401, -5.056]} rotation={[2.864, 1.178, -2.855]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh031.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh031_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group
          position={[-12.525, 0.577, -4.949]}
          rotation={[-0.983, -1.358, -0.966]}
          scale={0.001}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh032.geometry}
            material={Materials.leafMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh032_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-12.491, 0.557, -5.08]} rotation={[2.631, 1.151, -2.714]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh033.geometry}
            material={Materials.leafMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh033_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-12.602, 0.454, -5.025]} rotation={[2.864, 1.178, -2.855]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh034.geometry}
            material={Materials.stoneMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh034_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-12.594, 0.228, -5.168]} rotation={[3.023, 1.209, -2.76]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh035.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh035_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-12.656, 0.444, -5.239]} rotation={[2.864, 1.178, -2.855]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh036.geometry}
            material={Materials.leafMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh036_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-12.593, 0.535, -5.02]} rotation={[2.864, 1.178, -2.855]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh037.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh037_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-12.74, 0.297, -4.906]} rotation={[-3.128, 1.238, -2.688]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh038.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh038_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-12.562, 0.62, -4.997]} rotation={[2.864, 1.178, -2.855]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh040.geometry}
            material={Materials.treeMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh040_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain039.geometry}
          material={Materials.outlineMaterial}
          position={[-12.629, 0.57, -5.07]}
          rotation={[2.864, 1.178, -2.855]}
          scale={0.001}
        />
        <group position={[-12.599, 0.579, -4.919]} rotation={[3.139, 1.192, -3.029]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh043.geometry}
            material={Materials.treeMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh043_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
      </>
      <>
        <group position={[-2.799, 0.337, -1.344]} rotation={[-3.038, -0.741, -3.054]} scale={0.107}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle042.geometry}
            material={Materials.leafMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle042_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group
          position={[-2.765, 0.321, -1.307]}
          rotation={[1.491, -1.556, 1.457]}
          scale={[0.01, 0.01, 0.015]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere016_1.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere016_2.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-2.76, 0.244, -1.33]} rotation={[-3.065, -0.47, 0.075]} scale={0}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh128.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh128_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-2.737, 0.365, -1.373]} rotation={[-0.019, -0.103, -0.045]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh130.geometry}
            material={Materials.treeMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh130_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain047.geometry}
          material={Materials.outlineMaterial}
          position={[-18.296, 47.916, 4.398]}
          rotation={[-0.155, -0.107, -0.017]}
          scale={0.016}
        />
        <group position={[-2.742, 0.283, -1.342]} rotation={[-0.062, -0.103, 0.004]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh019.geometry}
            material={Materials.leafMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh019_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
      </>
      <>
        <group position={[-6.091, 0.361, -5.637]} rotation={[-0.046, -0.733, -0.004]} scale={0.106}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle039.geometry}
            material={Materials.leafMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle039_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-6.137, 0.114, -5.641]} rotation={[-0.046, -0.733, -0.004]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh014.geometry}
            material={Materials.stoneMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh014_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-6.091, 0.308, -5.757]} rotation={[-0.046, -0.733, -0.004]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh015.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh015_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-6.1, 0.215, -5.695]} rotation={[-0.179, -0.46, 0.415]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh017.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh017_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-6.09, 0.322, -5.682]} rotation={[-0.032, -0.735, -0.035]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh018.geometry}
            material={Materials.leafMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh018_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-6.191, 0.329, -5.728]} rotation={[-0.046, -0.733, -0.004]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh021.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh021_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-6.149, 0.402, -5.744]} rotation={[3.109, -1.258, -3.131]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh022.geometry}
            material={Materials.leafMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh022_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-6.029, 0.372, -5.778]} rotation={[-0.086, 1.163, 0.106]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh023.geometry}
            material={Materials.treeMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh023_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain021.geometry}
          material={Materials.grassMaterial}
          position={[-6.066, 0.325, -5.871]}
          rotation={[-0.048, -0.947, -0.006]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain022.geometry}
          material={Materials.outlineMaterial}
          position={[-6.081, 0.335, -5.807]}
          rotation={[-0.046, -0.733, -0.004]}
          scale={0.001}
        />
        <group position={[-6.177, 0.37, -5.806]} rotation={[-0.046, -0.733, -0.004]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh026.geometry}
            material={Materials.treeMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh026_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-6.094, 0.229, -5.743]} rotation={[-0.046, -0.733, -0.004]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh027.geometry}
            material={Materials.stoneMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh027_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-6.103, 0.334, -5.802]} rotation={[-0.046, -0.733, -0.004]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh028.geometry}
            material={Materials.leafMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh028_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain007.geometry}
          material={Materials.stoneMaterial}
          position={[-4.309, 0.922, -3.764]}
          rotation={[-2.41, -1.52, -2.519]}
          scale={0.001}
        />
        <group position={[-4.292, 0.92, -3.793]} rotation={[-2.41, -1.52, -2.519]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh003.geometry}
            material={Materials.stoneMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh003_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-4.309, 0.922, -3.764]} rotation={[-2.41, -1.52, -2.519]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh005.geometry}
            material={Materials.stoneMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh005_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-4.306, 1.115, -3.864]} rotation={[-0.024, 1.269, 0.127]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh002.geometry}
            material={Materials.leafMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh002_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain307.geometry}
          material={Materials.megalithicMaterials.main}
          position={[-4.363, 1.091, -3.832]}
          rotation={[-2.41, -1.52, -2.519]}
          scale={0.001}
        />
        <group position={[-4.283, 0.975, -3.782]} rotation={[-2.41, -1.52, -2.519]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh312.geometry}
            material={Materials.moutainMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh312_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-4.379, 0.744, -3.687]} rotation={[-2.025, -1.461, -1.893]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh313.geometry}
            material={Materials.leafMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh313_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-4.323, 0.939, -3.568]} rotation={[-2.41, -1.52, -2.519]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh314.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh314_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-4.278, 1.057, -3.778]} rotation={[-2.41, -1.52, -2.519]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh321.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh321_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-4.131, 0.806, -3.859]} rotation={[-2.002, -1.407, -1.673]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh323.geometry}
            material={Materials.moutainMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh323_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-4.286, 1.147, -3.8]} rotation={[-2.41, -1.52, -2.519]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh377.geometry}
            material={Materials.treeMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh377_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-4.297, 1.085, -3.675]} rotation={[2.258, -1.499, 1.986]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh378.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh378_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain375.geometry}
          material={Materials.outlineMaterial}
          position={[-4.261, 1.081, -3.715]}
          rotation={[-2.41, -1.52, -2.519]}
          scale={0.001}
        />
        <group position={[-4.226, 1.1, -3.871]} rotation={[-1.933, -1.451, -1.898]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh421.geometry}
            material={Materials.treeMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh421_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-4.292, 0.92, -3.793]} rotation={[-2.41, -1.52, -2.519]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh003.geometry}
            material={Materials.stoneMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh003_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain007.geometry}
          material={Materials.stoneMaterial}
          position={[-4.309, 0.922, -3.764]}
          rotation={[-2.41, -1.52, -2.519]}
          scale={0.001}
        />
      </>
      <>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Curve001.geometry}
          material={Materials.grassMaterial}
          position={[-6.119, 0.348, -5.68]}
          rotation={[-0.058, 0.193, 0.003]}
          scale={0.107}
        />
        <group position={[-6.091, 0.361, -5.637]} rotation={[-0.046, -0.733, -0.004]} scale={0.106}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle039.geometry}
            material={Materials.leafMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle039_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-6.137, 0.114, -5.641]} rotation={[-0.046, -0.733, -0.004]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh014.geometry}
            material={Materials.stoneMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh014_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-6.091, 0.308, -5.757]} rotation={[-0.046, -0.733, -0.004]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh015.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh015_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-6.1, 0.215, -5.695]} rotation={[-0.179, -0.46, 0.415]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh017.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh017_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-6.09, 0.322, -5.682]} rotation={[-0.032, -0.735, -0.035]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh018.geometry}
            material={Materials.leafMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh018_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-6.191, 0.329, -5.728]} rotation={[-0.046, -0.733, -0.004]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh021.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh021_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-6.149, 0.402, -5.744]} rotation={[3.109, -1.258, -3.131]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh022.geometry}
            material={Materials.leafMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh022_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-6.029, 0.372, -5.778]} rotation={[-0.086, 1.163, 0.106]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh023.geometry}
            material={Materials.treeMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh023_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain021.geometry}
          material={Materials.grassMaterial}
          position={[-6.066, 0.325, -5.871]}
          rotation={[-0.048, -0.947, -0.006]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain022.geometry}
          material={Materials.outlineMaterial}
          position={[-6.081, 0.335, -5.807]}
          rotation={[-0.046, -0.733, -0.004]}
          scale={0.001}
        />
        <group position={[-6.177, 0.37, -5.806]} rotation={[-0.046, -0.733, -0.004]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh026.geometry}
            material={Materials.treeMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh026_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-6.094, 0.229, -5.743]} rotation={[-0.046, -0.733, -0.004]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh027.geometry}
            material={Materials.stoneMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh027_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-6.103, 0.334, -5.802]} rotation={[-0.046, -0.733, -0.004]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh028.geometry}
            material={Materials.leafMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh028_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
      </>
      <>
        <group position={[-1.768, 0.525, -0.552]} rotation={[-0.582, -0.477, -0.898]} scale={0.106}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle036.geometry}
            material={Materials.treeMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle036_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-1.949, 0.381, -0.542]} rotation={[-0.582, -0.477, -0.898]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh011.geometry}
            material={Materials.leafMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh011_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-1.782, 0.49, -0.658]} rotation={[-0.582, -0.477, -0.898]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh326.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh326_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-1.855, 0.421, -0.596]} rotation={[-0.447, -0.211, -0.357]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh327.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh327_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-1.839, 0.574, -0.629]} rotation={[-0.582, -0.477, -0.898]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh382.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh382_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-1.76, 0.591, -0.645]} rotation={[-2.011, -0.766, -1.841]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh383.geometry}
            material={Materials.leafMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh383_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-1.719, 0.51, -0.741]} rotation={[-0.582, -0.477, -0.898]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh384.geometry}
            material={Materials.treeMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh384_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-1.792, 0.527, -0.751]} rotation={[-0.784, -0.602, -1.002]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh385.geometry}
            material={Materials.leafMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh385_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain382.geometry}
          material={Materials.outlineMaterial}
          position={[-1.756, 0.502, -0.708]}
          rotation={[-0.582, -0.477, -0.898]}
          scale={0.001}
        />
        <group position={[-1.8, 0.593, -0.707]} rotation={[-0.582, -0.477, -0.898]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh387.geometry}
            material={Materials.treeMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh387_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-1.838, 0.435, -0.644]} rotation={[-0.582, -0.477, -0.898]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh422.geometry}
            material={Materials.stoneMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh422_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Adinkra.geometry}
          material={Materials.adinkraMaterial}
          position={[-1.732, 0.488, -0.629]}
          rotation={[1.541, 0.758, 1.592]}
          scale={-0.181}
        />
      </>
      <>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain001.geometry}
          material={Materials.outlineMaterial}
          position={[-3.776, 1.305, -2.89]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.002}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain002.geometry}
          material={Materials.outlineMaterial}
          position={[-3.776, 1.309, -2.888]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.002}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain004.geometry}
          material={Materials.outlineMaterial}
          position={[-3.776, 1.304, -2.883]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.002}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain005.geometry}
          material={Materials.outlineMaterial}
          position={[-3.775, 1.308, -2.883]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.002}
        />
        <group position={[-3.28, 0.973, -2.544]} rotation={[-0.024, -0.441, -0.254]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh135.geometry}
            material={Materials.moutainMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh135_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain102.geometry}
          material={Materials.outlineMaterial}
          position={[-3.931, 1.174, -2.495]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain103.geometry}
          material={Materials.outlineMaterial}
          position={[-3.962, 1.176, -2.485]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain104.geometry}
          material={Materials.outlineMaterial}
          position={[-3.938, 1.172, -2.485]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain105.geometry}
          material={Materials.outlineMaterial}
          position={[-3.952, 1.174, -2.479]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain106.geometry}
          material={Materials.outlineMaterial}
          position={[-3.966, 1.18, -2.495]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain107.geometry}
          material={Materials.outlineMaterial}
          position={[-3.955, 1.181, -2.509]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain108.geometry}
          material={Materials.outlineMaterial}
          position={[-3.962, 1.18, -2.504]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain109.geometry}
          material={Materials.outlineMaterial}
          position={[-3.947, 1.178, -2.51]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain110.geometry}
          material={Materials.outlineMaterial}
          position={[-3.939, 1.175, -2.505]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain111.geometry}
          material={Materials.outlineMaterial}
          position={[-3.967, 1.185, -2.511]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain112.geometry}
          material={Materials.outlineMaterial}
          position={[-3.942, 1.181, -2.52]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain113.geometry}
          material={Materials.outlineMaterial}
          position={[-3.927, 1.176, -2.51]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain114.geometry}
          material={Materials.outlineMaterial}
          position={[-3.926, 1.175, -2.476]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain115.geometry}
          material={Materials.outlineMaterial}
          position={[-3.971, 1.181, -2.479]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain116.geometry}
          material={Materials.outlineMaterial}
          position={[-3.95, 1.174, -2.497]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain118.geometry}
          material={Materials.outlineMaterial}
          position={[-3.489, 1.059, -2.399]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain119.geometry}
          material={Materials.outlineMaterial}
          position={[-3.908, 1.174, -2.518]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain120.geometry}
          material={Materials.outlineMaterial}
          position={[-3.966, 1.204, -2.663]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.002}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain121.geometry}
          material={Materials.outlineMaterial}
          position={[-3.916, 1.177, -2.521]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain122.geometry}
          material={Materials.outlineMaterial}
          position={[-3.918, 1.179, -2.528]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain123.geometry}
          material={Materials.outlineMaterial}
          position={[-3.925, 1.183, -2.527]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain125.geometry}
          material={Materials.outlineMaterial}
          position={[-3.91, 1.174, -2.509]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <group position={[-3.29, 0.98, -2.65]} rotation={[-0.044, -0.095, -0.291]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh164.geometry}
            material={Materials.concreteMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh164_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain132.geometry}
          material={Materials.outlineMaterial}
          position={[-3.446, 0.773, -2.59]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain133.geometry}
          material={Materials.outlineMaterial}
          position={[-4.078, 0.961, -2.823]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain134.geometry}
          material={Materials.outlineMaterial}
          position={[-4.086, 0.974, -2.767]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain135.geometry}
          material={Materials.outlineMaterial}
          position={[-4.092, 0.969, -2.604]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <group position={[-3.76, 0.825, -2.616]} rotation={[2.919, 0.603, -2.787]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh172.geometry}
            material={Materials.stoneMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh172_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group
          position={[-3.696, 0.924, -2.567]}
          rotation={[2.919, 0.603, -2.787]}
          scale={[0.002, 0.001, 0.001]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh173.geometry}
            material={Materials.moutainMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh173_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group
          position={[-3.68, 1.047, -2.573]}
          rotation={[2.919, 0.603, -2.787]}
          scale={[0.002, 0.001, 0.001]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh174.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh174_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group
          position={[-3.666, 1.083, -2.572]}
          rotation={[2.919, 0.603, -2.787]}
          scale={[0.002, 0.001, 0.001]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh175.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh175_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group
          position={[-3.688, 1.015, -2.574]}
          rotation={[2.919, 0.603, -2.787]}
          scale={[0.002, 0.001, 0.001]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh176.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh176_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.terrain141.geometry}
          material={Materials.outlineMaterial}
          position={[-4.166, 1.355, -2.703]}
          rotation={[-0.044, -0.095, -0.291]}
          scale={0.001}
        />
        <group position={[-3.826, 0.91, -2.291]} rotation={[-0.163, -0.458, 2.817]} scale={0}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh178.geometry}
            material={Materials.stoneMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh178_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-3.573, 0.815, -2.28]} rotation={[0.658, 1.125, 2.417]} scale={0}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh179.geometry}
            material={Materials.stoneMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh179_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-3.475, 0.9, -2.211]} rotation={[-3.015, -0.443, -2.82]} scale={0}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh180.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh180_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-3.737, 0.976, -2.213]} rotation={[-3.025, -0.416, 0.318]} scale={0}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh181.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh181_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-4.036, 0.862, -2.48]} rotation={[-2.94, -0.572, -2.8]} scale={0.056}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle037.geometry}
            material={Materials.grassMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle037_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
        <group position={[-3.641, 1.144, -2.553]} rotation={[0.366, 0.723, -0.269]} scale={0.002}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder218.geometry}
            material={Materials.treeMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder218_1.geometry}
            material={Materials.outlineMaterial}
          />
        </group>
      </>
    </>
  )
}
