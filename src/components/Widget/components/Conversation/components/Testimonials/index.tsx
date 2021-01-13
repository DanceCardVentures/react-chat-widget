import React from "react";
import { useSelector } from "react-redux";

import { GlobalState } from "@types";

import "./style.scss";

function Testimonials() {
  const { dialogConfig } = useSelector((state: GlobalState) => ({
    dialogConfig: state.dialogConfig.config
  }));

  console.log("dialogConfig: ", dialogConfig);

  return (
    <div className="rcw-testimonials-container">
      <span>awesom teste</span>
    </div>
  );
}

export default Testimonials;
