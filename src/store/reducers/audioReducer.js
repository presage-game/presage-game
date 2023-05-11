import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isMuted: true,
  volume: 1,
}

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    toggleMute: (state) => {
      state.isMuted = !state.isMuted
    },
  },
})

export const { toggleMute } = audioSlice.actions

export default audioSlice.reducer
