import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Context from "./Context/Context";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.bubble.css";
import "react-tagsinput/react-tagsinput.css";

// Ensure to have a proper type for your root element
const rootElement = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Context>
        <App />
      </Context>
    </BrowserRouter>
  </React.StrictMode>
);
