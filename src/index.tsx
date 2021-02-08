import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import App from "./App";

const MOUNT_NODE = document.getElementById("dancecard-leadnurturing-chatbot");

render(<App />, MOUNT_NODE);

if (module.hot) {
  module.hot.accept(["./App"], () => {
    unmountComponentAtNode(MOUNT_NODE);
    const NextApp = require("./App").default;
    render(<NextApp />, MOUNT_NODE);
  });
}
