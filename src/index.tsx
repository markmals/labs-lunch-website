import * as React from "react"
import ReactDOM from "react-dom"
// eslint-disable-next-line import/no-unresolved
import {} from "react-dom/experimental"
import App from "./Pages/App"

const root = document.getElementById("root") as HTMLElement
ReactDOM.createRoot(root).render(<App />)
