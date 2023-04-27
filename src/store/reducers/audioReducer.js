import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentTrack: null,
  currentAmbiance: null,
  isTrackPlaying: false,
  isAmbiancePlaying: false,
  isSpeaking: false,
  isMuted: true,
  volume: 0.5,
}

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {},
})

export const {} = audioSlice.actions

export default audioSlice.reducer
