import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  scene: 0,
  pinpoint: null,
  isPinpointActive: false,
}

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    changeScene: (state, action) => {
      state.scene = action.payload
    },
    resetScene: (state) => {
      state.scene = null
    },
    changePinpoint: (state, action) => {
      state.pinpoint = action.payload
    },
    showPinpoint: (state) => {
      state.isPinpointActive = !state.isPinpointActive
    },
    resetPinpoint: (state) => {
      state.pinpoint = null
    },
  },
})

export const {
  changeScene,
  resetScene,
  changePinpoint,
  showPinpoint,
  resetPinpoint,
} = mapSlice.actions

export default mapSlice.reducer
