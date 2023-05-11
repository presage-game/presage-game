import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isMuted: true,
  volume: 1,
}

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {},
})

export const {} = audioSlice.actions

export default audioSlice.reducer
