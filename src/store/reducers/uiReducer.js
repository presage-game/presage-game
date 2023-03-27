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
    toggleIsOnMap: (state) => {
      state.isOnMap != state.isOnMap
    },
  },
})

export const { toggleBlackBars, toggleIsOnMap } = ui.actions

export default ui.reducer
