import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  showBlackBars: true,
  curtainStatus: 0,
  mapActive: false,
  mouseVariant: "default",
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleBlackBars: (state) => {
      state.showBlackBars = !state.showBlackBars
    },
    changeCurtainStatus: (state, action) => {
      state.curtainStatus = action.payload
    },
    toggleMap: (state) => {
      state.mapActive = !state.mapActive
    },
    changeMouseVariant: (state, action) => {
      state.mouseVariant = action.payload
    },
  },
})

export const { toggleBlackBars, changeCurtainStatus, toggleMap, changeMouseVariant } =
  uiSlice.actions

export default uiSlice.reducer
