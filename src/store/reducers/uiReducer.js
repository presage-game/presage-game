import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  showBlackBars: false,
  mapActive: false,
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleBlackBars: (state) => {
      state.showBlackBars = !state.showBlackBars
    },
    toggleMap: (state) => {
      state.mapActive = !state.mapActive
    },
  },
})

export const { toggleBlackBars, toggleMap } = uiSlice.actions

export default uiSlice.reducer
