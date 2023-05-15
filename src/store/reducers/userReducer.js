import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  gameCode: null,
  score: 0,
  scenario: "",
  isPromptComplete: false,
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
  ],
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setScore: (state, action) => {
      state.score += action.payload
    },
    completePrompts: (state) => {
      state.isPromptComplete = true
    },
    startExperience: (state) => {
      state.hasExperienceStarted = true
    },
    changeGameCode: (state, action) => {
      state.gameCode = action.payload
    },
    changeOnFocusCamera: (state, action) => {
      state.onFocusCamera = action.payload
    },
    changeOnFocusCameraPosition: (state, action) => {
      state.onFocusCameraPosition = action.payload
    },
    collectAdinkra: (state, action) => {
      state.collectedAdinkras.push(action.payload)
    },
  },
})

export const {
  setScore,
  completePrompts,
  startExperience,
  changeGameCode,
  changeOnFocusCamera,
  changeOnFocusCameraPosition,
  collectAdinkra
} = userSlice.actions

export default userSlice.reducer
