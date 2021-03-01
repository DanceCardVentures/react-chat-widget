import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import { GlobalState } from "src/store/types";

import phoneNumberIconSrc from "../../../../../../../assets/phone-call.svg";

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
  } = useSelector((state: GlobalState) => ({
    config: state.dialogConfig,
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
      <img src={phoneNumberIconSrc} alt="Phone" />

      {config?.phoneNumberParameters.phoneNumber}
    </motion.div>
  );
}

export default PhoneNumber;
