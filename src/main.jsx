import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { store } from "./store/store.js"
import { Provider } from "react-redux"
import "@/database/client"
import "./reset.scss"
import "./index.scss"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
