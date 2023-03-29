import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  gameCode: null,
  hasExperienceStarted: false,
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
    changeGameCode: (state, action) => {
      state.gameCode = action.payload
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
  changeGameCode,
  startExperience,
  changeScene,
  changeNoLerp,
  changeNoLerpFocus,
  changeOnFocusCamera,
  changeOnFocusCameraPosition,
} = userSlice.actions

export default userSlice.reducer
