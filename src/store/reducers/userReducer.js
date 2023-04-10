import { createSlice } from "@reduxjs/toolkit"

const initialState = {
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
    changeNoLerp: (state, action) => {
      state.noLerp = action.payload
    },
    changeNoLerpFocus: (state, action) => {
      state.noLerpFocus = action.payload
    },
  },
})

export const {
  changeNoLerp,
  changeNoLerpFocus,
} = userSlice.actions

export default userSlice.reducer
