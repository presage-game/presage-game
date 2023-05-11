import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  showBlackBars: false,
  mapActive: false,
  mouseVariant: "default"
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
    changeMouseVariant: (state, action) => {
      state.mouseVariant = action.payload
    }
  },
})

export const { toggleBlackBars, toggleMap, changeMouseVariant } = uiSlice.actions

export default uiSlice.reducer
