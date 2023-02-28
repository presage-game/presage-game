import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: 0,
  },
  reducers: {
    increase: (state) => {
      state.value += 1
    },
  },
})

export const { increase } = userSlice.actions

export default userSlice.reducer
