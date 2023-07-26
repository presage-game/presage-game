import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  blackBarsStatus: "closed",
  mapActive: false,
  radioModuleActive: false,
  mouseVariant: "default",
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeBlackBarsStatus: (state, action) => {
      state.blackBarsStatus = action.payload
    },
    toggleMap: (state) => {
      state.mapActive = !state.mapActive
    },
    toggleRadioModule: (state) => {
      state.radioModuleActive = !state.radioModuleActive
    },
    changeMouseVariant: (state, action) => {
      state.mouseVariant = action.payload
    },
  },
})

export const { changeBlackBarsStatus, toggleMap, toggleRadioModule, changeMouseVariant } =
  uiSlice.actions

export default uiSlice.reducer
