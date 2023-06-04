import { useEffect } from "react"
import { useSelector } from "react-redux"

// Context
const audioCtx = new AudioContext()

window.addEventListener("click", () => {
  if (audioCtx.state === "suspended") {
    audioCtx.resume()
  }
})

// Gain nodes
const trackGainNode = audioCtx.createGain()
const ambianceGainNode = audioCtx.createGain()
const mapGainNode = audioCtx.createGain()

// Audios
const trackAudio = new Audio()
const ambianceAudio = new Audio()
const mapAudio = new Audio()

const audios = [trackAudio, ambianceAudio, mapAudio]

audios.forEach((audio) => {
  audio.addEventListener("ended", () => {
    audio.currentTime = 0
    audio.play()
  })
})

// Source nodes
const trackSourceNode = audioCtx.createMediaElementSource(trackAudio)
const ambianceSourceNode = audioCtx.createMediaElementSource(ambianceAudio)
const mapSourceNode = audioCtx.createMediaElementSource(mapAudio)

trackSourceNode.connect(trackGainNode)
ambianceSourceNode.connect(ambianceGainNode)
mapSourceNode.connect(mapGainNode)

trackGainNode.connect(audioCtx.destination)
ambianceGainNode.connect(audioCtx.destination)
mapGainNode.connect(audioCtx.destination)

export const AudioManager = ({ sceneIndex, pinpointIndex, mapActive }) => {
  const { isSceneIntersecting, isPinpointIntersecting } = useSelector((state) => state.map)
  const { isMuted } = useSelector((state) => state.audio)

  useEffect(() => {
    if (isSceneIntersecting && !isMuted) {
      ambianceAudio.src = `/audios/scenes/${sceneIndex}/sounds/ambiance.mp3`
      ambianceAudio.play()
      ambianceGainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 2)
    } else if (!isSceneIntersecting && mapActive) {
      ambianceGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2)
    }
  }, [isSceneIntersecting, isMuted])

  useEffect(() => {
    if (isPinpointIntersecting && !isMuted) {
      ambianceAudio.src = `/audios/pinpoints/${pinpointIndex}/sounds/ambiance.mp3`
      ambianceAudio.play()
      ambianceGainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 2)
    } else {
      ambianceGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2)
    }
  }, [isPinpointIntersecting, isMuted])

  useEffect(() => {
    // If we enter the scene
    if (sceneIndex !== null && !isSceneIntersecting && !mapActive && !isMuted) {
      trackAudio.src = `/audios/scenes/${sceneIndex}/sounds/track.mp3`
      trackAudio.play()
      trackGainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 4)

      // If ambianceAudio is not already playing
      // if (ambianceAudio.currentTime === 0) {
      //   ambianceAudio.src = `src/assets/audios/scenes/scene-${sceneIndex}-ambiance.mp3`
      //   ambianceAudio.play()
      //   ambianceGainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 2)
      // }
    }
  }, [sceneIndex, isSceneIntersecting, isMuted])

  useEffect(() => {
    if (mapActive && !isMuted) {
      trackGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 4)
      ambianceGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 4)

      mapAudio.src = `/audios/map/track.mp3`
      mapAudio.play()
      mapGainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 4)
    } else {
      mapGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 4)
    }
  }, [mapActive, isMuted])

  useEffect(() => {
    if (isMuted) {
      // TODO: fix this
      // trackGainNode.gain.isMuted = true
      // ambianceGainNode.gain.isMuted = true
      // console.log("lets mute");
    }
  }, [isMuted])
}
