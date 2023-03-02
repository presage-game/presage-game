import { Gltf, useGLTF, Box, CycleRaycast } from "@react-three/drei"
import { Selection, Select, EffectComposer, Outline } from "@react-three/postprocessing"
import { Plane } from "../vehicules/Plane/Plane"

export const SceneOne = ({ onPlane }) => {
  const obj = useGLTF("assets/scenes/scene_1.glb")
  //const plane = obj.scene.children[0].scale.z = 2;
  return (
    <>
      <primitive object={obj.scene} dispose={null} />
      <Selection>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline blur visibleEdgeColor="white" edgeStrength={100} width={2000} xRay={false} />
        </EffectComposer>
        <Plane scale={7} position={[0, 8, 0]} rotation={[0, Math.PI / 2, 0]} />
      </Selection>
    </>
  )
}
