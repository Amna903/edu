import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { enableDeveloperToolsDeterrent } from "./lib/developer-tools-deterrent";

// DEVTOOLS-DETERRENT START — Comment out this single block during local browser debugging.
// This only discourages keyboard shortcuts; real security is enforced on the server.
enableDeveloperToolsDeterrent();
// DEVTOOLS-DETERRENT END — Safe to comment out for testing purposes.

const loader = document.getElementById("app-loader");
if (loader) {
  loader.remove();
}

createRoot(document.getElementById("root")!).render(<App />);
