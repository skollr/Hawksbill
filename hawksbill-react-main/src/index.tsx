import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import "./index.scss";
import Hawksbill from "./pages/Hawksbill";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Hawksbill />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals(console.log);
