import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { enableDeveloperToolsDeterrent } from "./lib/developer-tools-deterrent";

// DEVTOOLS-DETERRENT START — Comment out this single block during local browser debugging.
// This only discourages keyboard shortcuts; real security is enforced on the server.
enableDeveloperToolsDeterrent();
// DEVTOOLS-DETERRENT END — Safe to comment out for testing purposes.

createRoot(document.getElementById("root")!).render(<App />);

// Remove the static shell immediately after React has a chance to paint—no artificial delay.
requestAnimationFrame(() => document.getElementById("app-loader")?.remove());
