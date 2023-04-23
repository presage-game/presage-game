import { createSlice } from "@reduxjs/toolkit"
import introductionData from "@/assets/data/introduction.json"

const TIPPING_POINT = Object.keys(introductionData).length

const initialState = {
  score: 0,
  scenario: "",
  isPromptComplete: false,
  hasExperienceStarted: false,
}

export const introductionSlice = createSlice({
  name: "introduction",
  initialState,
  reducers: {
    answerPrompt: (state, action) => {
      state.score += action.payload
    },
    completePrompts: (state) => {
      state.isPromptComplete = true

      if (state.score <= TIPPING_POINT) {
        state.scenario = "1"
      } else {
        state.scenario = "2"
      }
    },
    startExperience: (state) => {
      state.hasExperienceStarted = true
    },
  },
})

export const { answerPrompt, completePrompts, startExperience } = introductionSlice.actions

export default introductionSlice.reducer
