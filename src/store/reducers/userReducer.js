import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  gameCode: null,
  scenario: "",
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
  collectedAdinkras: [
    {
      id: 1,
      name: "Adinkra 1",
      description: "Adinkra 1 description",
    },
    {
      id: 2,
      name: "Adinkra 2",
      description: "Adinkra 2 description",
    },
    {
      id: 3,
      name: "Adinkra 3",
      description: "Adinkra 3 description",
    },
  ],
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeGameCode: (state, action) => {
      state.gameCode = action.payload
    },
    changeOnFocusCamera: (state, action) => {
      state.onFocusCamera = action.payload
    },
    changeOnFocusCameraPosition: (state, action) => {
      state.onFocusCameraPosition = action.payload
    },
  },
})

export const { changeGameCode, changeOnFocusCamera, changeOnFocusCameraPosition } =
  userSlice.actions

export default userSlice.reducer
