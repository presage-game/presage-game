import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentTrack: null,
  currentAmbiance: null,
  isTrackPlaying: false,
  isAmbiancePlaying: false,
  isSpeaking: false,
}

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {},
})

export const {} = audioSlice.actions

export default audioSlice.reducer
