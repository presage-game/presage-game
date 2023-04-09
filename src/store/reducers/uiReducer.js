import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  showBlackBars: false,
  mapActive: false,
}

export const ui = createSlice({
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

export const { toggleBlackBars, toggleMap } = ui.actions

export default ui.reducer
