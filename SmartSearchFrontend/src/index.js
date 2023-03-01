import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ErrorBoundary from "./component/Security/ErrorBoundary";
import reportWebVitals from "./reportWebVitals";
import { ChatBotDialog } from "./component/Bots/ChatBotDialog";

/**
 * Initialize the React app
 */
const initializeApp = () => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <main>
          <ChatBotDialog />
        </main>
      </ErrorBoundary>
    </React.StrictMode>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals(console.log);
};

// if the device is ios or android use cordova,
if (window.cordova) {
  // Wait for the deviceready event before using any of Cordova's device APIs.
  // See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
  document.addEventListener("deviceready", initializeApp, false);
} else {
  // instead use the for regular browser web app
  // document.addEventListener("loadstart", initializeApp, false);
  initializeApp();
}
