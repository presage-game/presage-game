import { useEffect } from "react"

// Context
const audioCtx = new AudioContext()

// Gain nodes
const trackGainNode = audioCtx.createGain()
const ambianceGainNode = audioCtx.createGain()
const mapGainNode = audioCtx.createGain()

trackGainNode.connect(audioCtx.destination)
ambianceGainNode.connect(audioCtx.destination)
mapGainNode.connect(audioCtx.destination)

// Audios
const trackAudio = new Audio()
const ambianceAudio = new Audio()
const mapAudio = new Audio()

// Source nodes
const trackSourceNode = audioCtx.createMediaElementSource(trackAudio)
const ambianceSourceNode = audioCtx.createMediaElementSource(ambianceAudio)
const mapSourceNode = audioCtx.createMediaElementSource(mapAudio)

trackSourceNode.connect(trackGainNode)
ambianceSourceNode.connect(ambianceGainNode)
mapSourceNode.connect(mapGainNode)

export const AudioManager = ({ sceneIndex, pinpointIndex, mapActive }) => {
  useEffect(() => {
    // Approaching a scene on map
    if (sceneIndex !== null && mapActive) {
      ambianceAudio.src = `src/assets/audios/chapterOne/scenes/scene-${sceneIndex}-ambiance.mp3`

      ambianceAudio.addEventListener("loadedmetadata", () => {
        ambianceAudio.play()
        ambianceGainNode.gain.setValueAtTime(0, audioCtx.currentTime)
        ambianceGainNode.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 2)
      })
    }

    // Entering a scene
    if (sceneIndex !== null && !mapActive) {
      trackAudio.src = `src/assets/audios/chapterOne/scenes/scene-${sceneIndex}-track.mp3`

      trackAudio.addEventListener("loadedmetadata", () => {
        trackAudio.play()
        trackGainNode.gain.setValueAtTime(0, audioCtx.currentTime)
        trackGainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 2)
      })

      mapGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2)
      // setTimeout(() => {
      //   mapAudio.pause()
      // }, 2000)
    }

    // Going away from a scene on map
    if (sceneIndex === null) {
      trackGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2)
      ambianceGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2)
      // setTimeout(() => {
      //   trackAudio.pause()
      //   ambianceAudio.pause()
      // }, 2000)
    }
  }, [sceneIndex, mapActive])

  useEffect(() => {
    // Approaching a pinpoint on map
    if (pinpointIndex !== null) {
      ambianceAudio.src = `src/assets/audios/chapterOne/pinpoints/pinpoint-${pinpointIndex}-ambiance.mp3`

      ambianceAudio.addEventListener("loadedmetadata", () => {
        ambianceAudio.play()
        ambianceGainNode.gain.setValueAtTime(0, audioCtx.currentTime)
        ambianceGainNode.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 2)
      })
    }

    // Going away from a pinpoint on map
    if (pinpointIndex === null) {
      ambianceGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2)
      // setTimeout(() => {
      //   ambianceAudio.pause()
      // }, 2000)
    }
  }, [pinpointIndex])

  useEffect(() => {
    // Leaving a scene or opening map
    if (mapActive) {
      mapAudio.src = "src/assets/audios/map/map-track.mp3"

      mapAudio.addEventListener("loadedmetadata", () => {
        mapAudio.play()
        mapGainNode.gain.setValueAtTime(0, audioCtx.currentTime)
        mapGainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 2)
      })
    }
  }, [mapActive])
}
