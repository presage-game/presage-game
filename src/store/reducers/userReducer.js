import { createSlice } from "@reduxjs/toolkit"

const audio = new Audio("/audios/unlock.mp3")
audio.volume = 0.5

const initialState = {
  isPromptComplete: false,
  hasExperienceStarted: false,
  sceneEntranceAnimation: false,
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
  adinkras: [
    {
      id: 1,
      name: "Adinkra 1",
      description: "Adinkra 1 description",
      isCollected: false,
    },
    {
      id: 2,
      name: "Adinkra 2",
      description: "Adinkra 2 description",
      isCollected: false,
    },
    {
      id: 3,
      name: "Adinkra 3",
      description: "Adinkra 3 description",
      isCollected: false,
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
    changeSceneEntranceAnimation: (state, action) => {
      state.sceneEntranceAnimation = action.payload
    },
    completePrompts: (state) => {
      state.isPromptComplete = true
    },
    startExperience: (state) => {
      state.hasExperienceStarted = true
    },
    changeOnFocusCamera: (state, action) => {
      state.onFocusCamera = action.payload
    },
    changeOnFocusCameraPosition: (state, action) => {
      state.onFocusCameraPosition = action.payload
    },
    collectAdinkra: (state, action) => {
      state.adinkras[action.payload].isCollected = true
      audio.play()
    },
  },
})

export const {
  setScore,
  changeSceneEntranceAnimation,
  completePrompts,
  startExperience,
  changeOnFocusCamera,
  changeOnFocusCameraPosition,
  collectAdinkra,
} = userSlice.actions

export default userSlice.reducer
