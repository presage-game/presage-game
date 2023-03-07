import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./reducers/userReducer"
import introductionReducer from "./reducers/introductionReducer"

export const store = configureStore({
  reducer: {
    user: userReducer,
    introduction: introductionReducer
  },
})
