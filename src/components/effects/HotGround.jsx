import { Box, RenderTexture, shaderMaterial } from "@react-three/drei"
import { extend, useFrame } from "@react-three/fiber"
import { Texture, Color } from "three"

const HotMaterial = shaderMaterial(
  { time: 0, color: new Color(0.2, 0.0, 0.1) },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
  `
    precision mediump float;
    void main()
    {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
    `
)

extend({ HotMaterial })

export const HotGround = () => {
  let time = 1
  useFrame(() => (time += 0.1))

  return (
    <Box>
      <hotMaterial color="hotpink" time={time} />
    </Box>
  )
}
