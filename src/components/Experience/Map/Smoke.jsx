import * as THREE from "three"
import React, { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"

export const Smoke = ({ position }) => {
  let vs = []
  let fs = []
  let mesh = []
  let tex = []
  let mat = []

  /**
   * Textures
   */
  const textureLoader = new THREE.TextureLoader()

  tex["smoke"] = textureLoader.load(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTEwLTA2VDE3OjEwOjAzKzAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wMi0wNlQxMzozOTo0MSswMzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0wMi0wNlQxMzozOTo0MSswMzowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTA5NzNhNjYtNTFmMC1iMDRlLWE5NDMtNzVjZmFjNDYxZTc4IiB4bXBNTTpEb2N1bWVudElE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"
  )

  vs["sprite"] = `
attribute vec3 offset;
attribute vec2 scale;
attribute vec4 quaternion;
attribute float rotation;
attribute vec4 color;
attribute float blend;
attribute float texture;
uniform float time;
varying vec2 vUv;
varying vec4 vColor;
varying float vBlend;
varying float num;
vec3 localUpVector=vec3(0.0,1.0,0.0);

void main(){

float angle=time*rotation;
vec3 vRotated=vec3(position.x*scale.x*cos(angle)-position.y*scale.y*sin(angle),position.y*scale.y*cos(angle)+position.x*scale.x*sin(angle),position.z);

vUv=uv;
vColor=color;
vBlend=blend;
num=texture;


vec3 vPosition;

/*
vec3 vLook=normalize(offset-cameraPosition);
vec3 vRight=normalize(cross(vLook,localUpVector));
vec3 vUp=normalize(cross(vLook,vRight));
vPosition=vRight*vRotated.x+vUp*vRotated.y+vLook*vRotated.z;
*/

vec3 vLook=offset-cameraPosition;
vec3 vRight=normalize(cross(vLook,localUpVector));
vPosition=vRotated.x*vRight+vRotated.y*localUpVector+vRotated.z;

gl_Position=projectionMatrix*modelViewMatrix*vec4(vPosition+offset,1.0);
}
`

  fs["sprite"] = `
const int count=3;
uniform sampler2D map[count];
varying vec2 vUv;
varying vec4 vColor;
varying float vBlend;
varying float num;

void main(){

if(num==0.0){ gl_FragColor=texture2D(map[0],vUv)*vColor; }
else if(num==1.0){ gl_FragColor=texture2D(map[1],vUv)*vColor; }
else if(num==2.0){ gl_FragColor=texture2D(map[2],vUv)*vColor; }

gl_FragColor.rgb*=gl_FragColor.a;
gl_FragColor.a*=vBlend;
}
`

  let particles = []

  // ____________________ SMOKE ____________________

  let wind_x = 0
  let wind_y = -0.04
  let wind_z = -0.08

  let particles_smoke_a = []

  let particles_emmiter = []

  particles_emmiter.push({
    position: position,
    radius_1: 0.02,
    radius_2: 0.4,
    radius_height: 5,
    add_time: 0.01,
    elapsed: 0,
    live_time_from: 0.1,
    live_time_to: 0.2,
    opacity_decrease: 0.004,
    rotation_from: 2,
    rotation_to: 3,
    speed_from: 0.04,
    speed_to: 0.05,
    scale_from: 0.1,
    scale_increase: 0.003,
    color_from: [1, 1, 1],
    color_to: [0.2, 0.2, 0.2],
    color_speed_from: 1,
    color_speed_to: 1,
    brightness_from: 1,
    brightness_to: 1,
    opacity: 0.4,
    blend: 0.5,
    texture: 0,
  })

  // ____________________ PARTICLES EMMITER EMMIT ____________________

  function particles_emmiter_emmit(item) {
    let radius_1 = item.radius_1 * Math.sqrt(Math.random())
    let theta = 2 * Math.PI * Math.random()
    let x_1 = item.position.x + radius_1 * Math.cos(theta)
    let z_1 = item.position.z + radius_1 * Math.sin(theta)

    let radius_2 = item.radius_2 * Math.sqrt(Math.random())
    theta = 2 * Math.PI * Math.random()
    let x_2 = x_1 + radius_2 * Math.cos(theta)
    let z_2 = z_1 + radius_2 * Math.sin(theta)

    let direction_x = x_2 - x_1
    let direction_y = item.radius_height
    let direction_z = z_2 - z_1

    let speed = Math.random() * (item.speed_to - item.speed_from) + item.speed_from

    let divide =
      (1 /
        Math.sqrt(
          direction_x * direction_x + direction_y * direction_y + direction_z * direction_z
        )) *
      speed
    direction_x *= divide
    direction_y *= divide
    direction_z *= divide

    let brightness =
      Math.random() * (item.brightness_to - item.brightness_from) + item.brightness_from

    particles_smoke_a.push({
      offset: [x_1, item.position.y, z_1],
      scale: [item.scale_from, item.scale_from],
      quaternion: [direction_x, direction_y, direction_z, 3],
      rotation: Math.random() * (item.rotation_to - item.rotation_from) + item.rotation_from,
      color: [1, 1, 1, item.opacity],
      blend: item.blend,
      texture: item.texture,
      live: Math.random() * (item.live_time_to - item.live_time_from) + item.live_time_from,
      scale_increase: item.scale_increase,
      opacity_decrease: item.opacity_decrease,
      color_from: [
        item.color_from[0] * brightness,
        item.color_from[1] * brightness,
        item.color_from[2] * brightness,
      ],
      color_to: [
        item.color_to[0] * brightness,
        item.color_to[1] * brightness,
        item.color_to[2] * brightness,
      ],
      color_speed:
        Math.random() * (item.color_speed_to - item.color_speed_from) + item.color_speed_from,
      color_pr: 10,
    })
  }

  // ____________________ PERTICLES EMMITER UPDATE ____________________

  function particles_emmiter_update(delta) {
    let max = particles_emmiter.length

    for (let n = 0; n < max; n++) {
      let item = particles_emmiter[n]

      let add = 0

      item.elapsed += delta
      add = Math.floor(item.elapsed / item.add_time)
      item.elapsed -= add * item.add_time
      if (add > (0.016 / item.add_time) * 60 * 1) {
        item.elapsed = 0
        add = 0
      }

      while (add--) {
        particles_emmiter_emmit(item)
      }
    }

    max = particles_smoke_a.length
    let alive = new Array(max)
    let i = 0

    for (let j = 0; j < max; j++) {
      let item = particles_smoke_a[j]

      if (item.color_pr < 1) {
        let color_r = item.color_from[0] + (item.color_to[0] - item.color_from[0]) * item.color_pr
        let color_g = item.color_from[1] + (item.color_to[0] - item.color_from[1]) * item.color_pr
        let color_b = item.color_from[1] + (item.color_to[0] - item.color_from[2]) * item.color_pr
        item.color_pr += delta * item.color_speed
        item.color[0] = color_r
        item.color[1] = color_g
        item.color[2] = color_b
      } else {
        item.color[0] = item.color_to[0]
        item.color[1] = item.color_to[1]
        item.color[2] = item.color_to[2]
      }

      item.offset[0] += item.quaternion[0] + wind_x
      item.offset[1] += item.quaternion[1] + wind_y
      item.offset[2] += item.quaternion[2] + wind_z
      item.scale[0] += item.scale_increase
      item.scale[1] += item.scale_increase

      if (item.live > 0) {
        item.live -= delta
      } else {
        item.color[3] -= item.opacity_decrease
      }
      if (item.color[3] > 0) {
        alive[i] = item
        i++
      }
    }

    alive.length = i
    particles_smoke_a = alive
  }

  function particles_update(delta) {
    particles_emmiter_update(delta)

    particles = []

    let max_1 = particles_smoke_a.length
    particles.length = max_1
    for (let n = 0; n < max_1; n++) {
      particles[n] = particles_smoke_a[n]
    }

    let count = particles.length

    particles.sort((a, b) => b.d - a.d)

    let offset = new Float32Array(count * 3)
    let scale = new Float32Array(count * 2)
    let quaternion = new Float32Array(count * 4)
    let rotation = new Float32Array(count)
    let color = new Float32Array(count * 4)
    let blend = new Float32Array(count)
    let texture = new Float32Array(count)

    for (let n = 0; n < count; n++) {
      // 1 VALUE
      let item = particles[n]
      rotation[n] = item.rotation
      texture[n] = item.texture
      blend[n] = item.blend

      // 2 VALUE
      let p = n * 2
      let one = p + 1
      let i_scale = item.scale
      scale[p] = i_scale[0]
      scale[one] = i_scale[1]

      // 3 VALUE
      p = n * 3
      one = p + 1
      let two = p + 2
      let i_offset = item.offset
      offset[p] = i_offset[0]
      offset[one] = i_offset[1]
      offset[two] = i_offset[2]

      // 4 VALUE
      p = n * 4
      one = p + 1
      two = p + 2
      let three = p + 3
      let i_color = item.color
      color[p] = i_color[0]
      color[one] = i_color[1]
      color[two] = i_color[2]
      color[three] = i_color[3]
      let i_quaternion = item.quaternion
      quaternion[p] = i_quaternion[0]
      quaternion[one] = i_quaternion[1]
      quaternion[two] = i_quaternion[2]
      quaternion[three] = i_quaternion[3]
    }

    let item = mesh["sprite"].geometry.attributes
    item.offset = new THREE.InstancedBufferAttribute(offset, 3).setUsage(THREE.DynamicDrawUsage)
    item.scale = new THREE.InstancedBufferAttribute(scale, 2).setUsage(THREE.DynamicDrawUsage)
    item.quaternion = new THREE.InstancedBufferAttribute(quaternion, 4).setUsage(
      THREE.DynamicDrawUsage
    )
    item.rotation = new THREE.InstancedBufferAttribute(rotation, 1).setUsage(THREE.DynamicDrawUsage)
    item.color = new THREE.InstancedBufferAttribute(color, 4).setUsage(THREE.DynamicDrawUsage)
    item.blend = new THREE.InstancedBufferAttribute(blend, 1).setUsage(THREE.DynamicDrawUsage)
    item.texture = new THREE.InstancedBufferAttribute(texture, 1).setUsage(THREE.DynamicDrawUsage)

    mesh["sprite"].geometry._maxInstanceCount = count
  }

  let geometry = new THREE.InstancedBufferGeometry()
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      new Float32Array([
        -0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, 0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, -0.5, 0,
      ]),
      3
    )
  )
  geometry.setAttribute(
    "uv",
    new THREE.Float32BufferAttribute(new Float32Array([0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0]), 2)
  )
  geometry.setAttribute("offset", new THREE.InstancedBufferAttribute(new Float32Array(), 3))
  geometry.setAttribute("scale", new THREE.InstancedBufferAttribute(new Float32Array(), 2))
  geometry.setAttribute("quaternion", new THREE.InstancedBufferAttribute(new Float32Array(), 4))
  geometry.setAttribute("rotation", new THREE.InstancedBufferAttribute(new Float32Array(), 1))
  geometry.setAttribute("color", new THREE.InstancedBufferAttribute(new Float32Array(), 4))
  geometry.setAttribute("blend", new THREE.InstancedBufferAttribute(new Float32Array(), 1))
  geometry.setAttribute("texture", new THREE.InstancedBufferAttribute(new Float32Array(), 1))

  mat["sprite"] = new THREE.ShaderMaterial({
    uniforms: {
      map: { value: [tex["smoke"]] },
      time: { value: 0 },
    },
    vertexShader: vs["sprite"],
    fragmentShader: fs["sprite"],
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.CustomBlending,
    blendEquation: THREE.AddEquation,
    blendSrc: THREE.OneFactor,
    blendDst: THREE.OneMinusSrcAlphaFactor,
  })

  mesh["sprite"] = new THREE.Mesh(geometry, mat["sprite"])
  mesh["sprite"].frustumCulled = false
  mesh["sprite"].matrixAutoUpdate = false
  mesh["sprite"].updateMatrixWorld = function () {}

  /**
   * Animate
   */

  useFrame((state, deltaFrame) => {
    const elapsedTime = state.clock.getElapsedTime()

    particles_update(deltaFrame)

    mat["sprite"].uniforms.time.value = elapsedTime
  })

  return (
    <>
      <primitive object={mesh["sprite"]} />
    </>
  )
}
