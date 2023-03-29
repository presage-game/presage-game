import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: 0,
  hasExperienceStarted: false,
  scene: 1,
  onFocusCamera: false,
  onFocusCameraPosition: {
    position: {
      x: -30,
      y: 0,
      z: 15,
    },
    rotation: {
      x: -Math.PI / 3,
      y: 0,
      z: 0,
    },
  },
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
    increase: (state) => {
      state.value += 1
      console.log("increase dispatch : " + state.value)
    },
    startExperience: (state) => {
      state.hasExperienceStarted = true
    },
    changeScene: (state, action) => {
      state.scene = action.payload
      state.onFocusCamera = false
    },
    changeNoLerp: (state, action) => {
      state.noLerp = action.payload
    },
    changeNoLerpFocus: (state, action) => {
      state.noLerpFocus = action.payload
    },
    changeOnFocusCamera: (state, action) => {
      state.onFocusCamera = action.payload
    },
    changeOnFocusCameraPosition: (state, action) => {
      state.onFocusCameraPosition = action.payload
    },
    resetOnFocusCameraPosition: (state, action) => {
      state.onFocusCameraPosition
    },
  },
})

export const {
  increase,
  startExperience,
  changeScene,
  changeNoLerp,
  changeNoLerpFocus,
  changeOnFocusCamera,
  changeOnFocusCameraPosition,
} = userSlice.actions

export default userSlice.reducer
