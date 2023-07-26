export const WaterFlasks = ({ Materials, nodes }) => {
  return (
    <>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere003.geometry}
        material={Materials.waterMaterial}
        position={[0.974, -0.061, 0.433]}
        rotation={[0.002, 1.004, -0.001]}
        scale={[0.027, 0.002, 0.024]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere005.geometry}
        material={Materials.waterMaterial}
        position={[0.712, -0.061, 0.454]}
        rotation={[3.132, -0.128, -3.141]}
        scale={[0.018, 0.001, 0.016]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere006.geometry}
        material={Materials.waterMaterial}
        position={[0.021, -0.076, -0.362]}
        rotation={[0.01, -0.422, 0.006]}
        scale={[0.022, 0.001, 0.02]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere007.geometry}
        material={Materials.waterMaterial}
        position={[-0.334, -0.071, -0.055]}
        rotation={[0.146, -1.508, 0.148]}
        scale={[0.04, 0.003, 0.036]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere008.geometry}
        material={Materials.waterMaterial}
        position={[0.279, -0.076, -0.064]}
        rotation={[0.024, 1.183, -0.021]}
        scale={[0.022, 0.001, 0.02]}
      />
    </>
  )
}
