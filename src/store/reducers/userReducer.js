import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  scene: 0,
  pinpoint: null,
  isPinpointActive: false,
  noLerp: false,
  noLerpFocus: {
    x: 0,
    y: 0,
  },
}

export const userSlice = createSlice({
  name: "user",
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
    changeNoLerp: (state, action) => {
      state.noLerp = action.payload
    },
    changeNoLerpFocus: (state, action) => {
      state.noLerpFocus = action.payload
    },
  },
})

export const {
  changeScene,
  resetScene,
  changePinpoint,
  showPinpoint,
  resetPinpoint,
  changeNoLerp,
  changeNoLerpFocus,
} = userSlice.actions

export default userSlice.reducer
