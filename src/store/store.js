import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./reducers/userReducer"
import uiReducer from "./reducers/uiReducer"
import mapReducer from "./reducers/mapReducer"
import audioReducer from "./reducers/audioReducer"

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    map: mapReducer,
    audio: audioReducer,
  },
})
