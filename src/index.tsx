import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import App from "./App";

const MOUNT_NODE = document.getElementById("dancecard-leadnurturing-chatbot");

window.DANCECARD_LEAD_NURTURING_CHATBOT_INTEGRATION_ID =
  "7fa68be8-6a53-447b-b8f5-3af6d02d7cec";

// console.log(window.DANCECARD_LEAD_NURTURING_CHATBOT_INTEGRATION_ID);

render(<App />, MOUNT_NODE);

if (module.hot) {
  module.hot.accept(["./App"], () => {
    unmountComponentAtNode(MOUNT_NODE);
    const NextApp = require("./App").default;
    render(<NextApp />, MOUNT_NODE);
  });
}
