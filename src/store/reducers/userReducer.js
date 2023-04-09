import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  scene: 0,
  pinpoint: null,
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
    changePinpoint: (state, action) => {
      state.pinpoint = action.payload
    },
    resetPinpoint: (state) => {
      state.pinpoint = null
      console.log("resetPinpoint dispatch : " + state.pinpoint)
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
  increase,
  startExperience,
  changeScene,
  changePinpoint,
  resetPinpoint,
  changeNoLerp,
  changeNoLerpFocus,
} = userSlice.actions

export default userSlice.reducer
