import { createSlice } from "@reduxjs/toolkit"

const TIPPING_POINT = 10;

const initialState = {
  currentIndex: 0,
  score: 0,
  scenario: "",
  isPromptComplete: false,
}

export const userSlice = createSlice({
  name: "introduction",
  initialState,
  reducers: {
    answerPrompt: (state, action) => {
      state.score += action.payload
      state.currentIndex++
    },
    completePrompts: (state) => {
      state.isPromptComplete = true

      if (state.score <= TIPPING_POINT) {
        state.scenario = "1"
      } else {
        state.scenario = "2"
      }
    },
  },
})

export const { answerPrompt, completePrompts } = userSlice.actions

export default userSlice.reducer
