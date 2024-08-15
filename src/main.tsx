import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Context from "./Context/Context.tsx";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.bubble.css";
import "react-tagsinput/react-tagsinput.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Context>
        <App />
      </Context>
    </BrowserRouter>
  </React.StrictMode>
);
