import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: 0,
  hasExperienceStarted: false,
  scene: 1,
  onFocusCamera: false,
  onFocusCameraPosition: {
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
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
    changeOnFocusCamera: (state, action) => {
      state.onFocusCamera = action.payload
    },
    changeOnFocusCameraPosition: (state, action) => {
      state.onFocusCameraPosition = action.payload
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
