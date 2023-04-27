import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./reducers/userReducer"
import introductionReducer from "./reducers/introductionReducer"
import uiReducer from "./reducers/uiReducer"
import mapReducer from "./reducers/mapReducer"
import audioReducer from "./reducers/audioReducer"

export const store = configureStore({
  reducer: {
    user: userReducer,
    introduction: introductionReducer,
    ui: uiReducer,
    map: mapReducer,
    audio: audioReducer,
  },
})
