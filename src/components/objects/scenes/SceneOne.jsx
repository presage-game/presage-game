import { Gltf, useGLTF } from "@react-three/drei"
import { Raycaster } from "three"

export const SceneOne = ({ onPlane }) => {
  const raycaster = new Raycaster()
  const obj = useGLTF("assets/scenes/scene_1.glb")
  console.log(obj)
  console.log(obj.scene.children)
  const intersects = raycaster.intersectObjects(obj.scene.children[0], true)
  console.log(intersects)
  if (intersects.length > 0) {
    console.log("oui")
  }
  //const plane = obj.scene.children[0].scale.z = 2;
  return <primitive object={obj.scene} dispose={null} />
}
