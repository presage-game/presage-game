import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentTrack: null,
  currentAmbiance: null,
  isTrackPlaying: false,
  isAmbiancePlaying: false,
  isSpeaking: false,
}

export const audio = createSlice({
  name: "audio",
  initialState,
  reducers: {},
})

export const {} = audio.actions

export default audio.reducer
