import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  showBlackBars: false,
  isOnMap: false,
}

export const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleBlackBars: (state) => {
      state.showBlackBars = !state.showBlackBars
    },
    toggleMap: (state) => {
      state.isOnMap = !state.isOnMap
    },
  },
})

export const { toggleBlackBars, toggleMap } = ui.actions

export default ui.reducer
