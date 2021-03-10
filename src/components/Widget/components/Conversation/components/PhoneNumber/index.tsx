import React from "react";

import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import { GlobalState } from "src/store/types";

import { renderPhoneIcon } from "src/utils/iconRenderers";

import "./style.scss";

const animationVariants = {
  visible: {
    opacity: 1,
    visibility: "visible",
    transition: {
      duration: 0.25,
    },
  },
  hidden: {
    opacity: 0,
    visibility: "hidden",
  },
};

function PhoneNumber() {
  const {
    config: { config },
    parameters,
    phoneNumberIsVisible,
  } = useSelector((state: GlobalState) => ({
    config: state.dialogConfig,
    parameters: state.dialogConfig.parameters,
    phoneNumberIsVisible: state.behavior.phoneNumberIsVisible,
  }));

  return (
    <motion.div
      initial={false}
      variants={animationVariants}
      animate={phoneNumberIsVisible ? "visible" : "hidden"}
      className="rcw-phone-number-container"
    >
      {renderPhoneIcon(parameters?.phoneIconColor)}

      <span>{config?.phoneNumberParameters.phoneNumber}</span>
    </motion.div>
  );
}

export default PhoneNumber;
