import { useEffect } from "react"
import { useSelector } from "react-redux"

// Context
const audioCtx = new AudioContext()

// Gain nodes
const trackGainNode = audioCtx.createGain()
const ambianceGainNode = audioCtx.createGain()
const mapGainNode = audioCtx.createGain()

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

trackGainNode.connect(audioCtx.destination)
ambianceGainNode.connect(audioCtx.destination)
mapGainNode.connect(audioCtx.destination)

export const AudioManager = ({ sceneIndex, pinpointIndex, mapActive }) => {
  const { isSceneIntersecting, isPinpointIntersecting } = useSelector((state) => state.map)

  useEffect(() => {
    if (isSceneIntersecting) {
      ambianceAudio.src = `src/assets/audios/chapterOne/scenes/scene-${sceneIndex}-ambiance.mp3`
      ambianceAudio.play()
      ambianceGainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 4)
    } else if (!isSceneIntersecting && mapActive) {
      ambianceGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 4)
    }
  }, [isSceneIntersecting])

  useEffect(() => {
    if (isPinpointIntersecting) {
      ambianceAudio.src = `src/assets/audios/chapterOne/pinpoints/pinpoint-${pinpointIndex}-ambiance.mp3`
      ambianceAudio.play()
      ambianceGainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 4)
    } else {
      ambianceGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 4)
    }
  }, [isPinpointIntersecting])

  useEffect(() => {
    // If we enter the scene
    if (sceneIndex !== null && !isSceneIntersecting && !mapActive) {
      trackAudio.src = `src/assets/audios/chapterOne/scenes/scene-${sceneIndex}-track.mp3`
      trackAudio.play()
      trackGainNode.gain.linearRampToValueAtTime(1.0, audioCtx.currentTime + 4)
    }
  }, [sceneIndex, isSceneIntersecting])

  useEffect(() => {
    if (mapActive) {
      trackGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 4)
      ambianceGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 4)

      mapAudio.src = `src/assets/audios/map/map-track.mp3`
      mapAudio.play()
      mapGainNode.gain.linearRampToValueAtTime(0.75, audioCtx.currentTime + 4)
    } else {
      mapGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 4)
    }
  }, [mapActive])
}
