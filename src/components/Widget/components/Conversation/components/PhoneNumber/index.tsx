import React, { useState, useEffect } from "react";

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
  } = useSelector((state: GlobalState) => ({
    config: state.dialogConfig,
    parameters: state.dialogConfig.parameters,
  }));

  const [isVisible, setVisibility] = useState(false);

  useEffect(() => {
    setTimeout(
      () => {
        setVisibility(true);
      },
      config?.phoneNumberParameters.delayInSeconds
        ? config?.phoneNumberParameters.delayInSeconds * 1000
        : 3000
    );
  }, []);

  return (
    <motion.div
      initial={false}
      variants={animationVariants}
      animate={isVisible ? "visible" : "hidden"}
      className="rcw-phone-number-container"
    >
      {renderPhoneIcon(parameters?.phoneIconColor)}

      <span style={{ color: parameters?.phoneIconColor }}>
        {config?.phoneNumberParameters.phoneNumber}
      </span>
    </motion.div>
  );
}

export default PhoneNumber;
