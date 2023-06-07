import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isMuted: false,
  volume: 1,
}

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    toggleMute: (state) => {
      state.isMuted = !state.isMuted
      state.volume = state.isMuted ? 0 : 1
    },
    changeVolume: (state,action) => {
      state.volume = action.payload
    } 
  },
})

export const { toggleMute, changeVolume } = audioSlice.actions

export default audioSlice.reducer
