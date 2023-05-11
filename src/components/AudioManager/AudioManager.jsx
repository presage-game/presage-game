import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { intersectScene, intersectPinpoint } from "@/store/reducers/mapReducer"

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

  const dispatch = useDispatch()

  useEffect(() => {
    if (isSceneIntersecting) {
      ambianceAudio.src = `src/assets/audios/chapterOne/scenes/scene-${sceneIndex}-ambiance.mp3`
      ambianceAudio.play()
      ambianceGainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 2)
    } else {
      ambianceGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2)
    }
  }, [isSceneIntersecting])

  useEffect(() => {
    if (isPinpointIntersecting) {
      ambianceAudio.src = `src/assets/audios/chapterOne/pinpoints/pinpoint-${pinpointIndex}-ambiance.mp3`
      ambianceAudio.play()
      ambianceGainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 2)
    } else {
      ambianceGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2)
    }
  }, [isPinpointIntersecting])

  useEffect(() => {
    // If we enter the scene
    if (sceneIndex !== null && !isSceneIntersecting) {
      trackAudio.src = `src/assets/audios/chapterOne/scenes/scene-${sceneIndex}-track.mp3`
      trackAudio.play()
      trackGainNode.gain.linearRampToValueAtTime(1.0, audioCtx.currentTime + 2)
    }
  }, [sceneIndex])

  useEffect(() => {
    if (mapActive) {
      trackGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2)
      ambianceGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2)

      mapAudio.src = `src/assets/audios/map/map-track.mp3`
      mapAudio.play()
      mapGainNode.gain.linearRampToValueAtTime(0.75, audioCtx.currentTime + 2)
    } else {
      dispatch(intersectScene(false))
      console.log(isSceneIntersecting)
      mapGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2)
    }
  }, [mapActive])
}
