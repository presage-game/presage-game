import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: 0,
  },
  reducers: {
    increase: (state) => {
      state.value += 1
      console.log("increase dispatch : " + state.value)
    },
  },
})

export const { increase } = userSlice.actions

export default userSlice.reducer
