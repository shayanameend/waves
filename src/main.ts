import { createElement, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("app") as HTMLElement).render(
  createElement(StrictMode, {}, createElement(App))
);
