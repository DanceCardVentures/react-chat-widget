import React from "react";
import { useSelector } from "react-redux";

import cn from "classnames";
import { motion } from "framer-motion";

import { GlobalState } from "../../../../store/types";

import Testimonials from "src/components/Widget/components/Conversation/components/Testimonials";

import "./style.scss";

import clsoseIconSrc from "../../../../../assets/close-icon.svg";

type Props = {
  toggle: () => void;
  chatId: string;
  openLabel: string;
  closeLabel: string;
};

function Launcher({ toggle }: Props) {
  const { showChat, parameters } = useSelector((state: GlobalState) => ({
    showChat: state.behavior.showChat,
    parameters: state.dialogConfig.parameters,
  }));

  const buttonVarianst = {
    fullWidth: {
      width: window.innerWidth < 600 ? 215 : 250,
      height: window.innerWidth < 600 ? 40 : 52,
      transition: { delayChildren: 0.1 },
    },
    collapsed: { width: 52, height: 52, borderRadius: 30 },
  };

  const contentHolderVariants = {
    fullWidth: { opacity: 1, transition: { duration: 0.2 } },
    collapsed: { opacity: 0, transition: { duration: 0 } },
  };

  return (
    <div
      className={cn("rcw-laucner-button-holder", {
        "rcw-laucner-button-holder-chat-is-open": showChat,
      })}
    >
      <motion.button
        style={{ background: parameters?.openButtonColor }}
        className="rcw-launcher-animated-button"
        initial={showChat ? buttonVarianst.collapsed : buttonVarianst.fullWidth}
        onClick={toggle}
        animate={showChat ? "collapsed" : "fullWidth"}
        variants={buttonVarianst}
      >
        {showChat && <img src={clsoseIconSrc} alt="Close" />}

        <motion.div variants={contentHolderVariants}>
          <Testimonials isLaunerEmbdded />
        </motion.div>
      </motion.button>
    </div>
  );
}

export default Launcher;
